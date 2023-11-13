import { Router, Request, Response } from "express";
import { getAllBorrowItems, getAllReservations, addReservation } from "../database/db.service";
import { IReservationAddCommand } from "../models/reservation.command";

export function registerReservationRoutes(app: Router) {
  app.get("/api/reservations", (req: Request, res: Response) => {
    const { userId } = req.query;
    const userIdNumber = parseInt(userId as string, 10);

    if (!userId) {
      res.status(400).send("Missing userId");
      return;
    }

    const borrowItems = getAllBorrowItems();

    const userReservations = getAllReservations().filter(
      (r) => r.userId === userIdNumber
    );

    userReservations.forEach((r) => {
      r.borrowItemName = borrowItems.find((b) => b.id === r.borrowItemId)?.name;
    });

    res.json(userReservations);
  });

  app.post("/api/reservations", (req: Request, res: Response) => {
    const reservationAddCommand = req.body as IReservationAddCommand;
    const validatedReservation = validateCommandReservation(
      reservationAddCommand
    );

    if (validatedReservation != null) {
      res.status(400).send(validatedReservation);
      return;
    }
    reservationAddCommand.date = new Date(reservationAddCommand.date); // json date is string, convert to Date object)

    const reservations = getAllReservations();
    const reservationOnSameDay = reservations.find(
      (r) =>
        r.borrowItemId === reservationAddCommand.borrowItemId &&
        r.date.toDateString() === reservationAddCommand.date.toDateString()
    );

    if (reservationOnSameDay) {
      res.status(409).send({ error: "Reservation already exists" });
      return;
    }

    addReservation(reservationAddCommand);

    // save reservation to database
    res.status(201).json({ success: true });
  });
}

function validateCommandReservation(
  command: IReservationAddCommand
): object | null {
  if (
    command.userId == null ||
    command.borrowItemId == null ||
    command.date == null ||
    command.description == null
  )
    return { error: "Missing data" };

  if (command.userId < 0) return { error: "Invalid userId" };
  if (command.borrowItemId < 0) return { error: "Invalid borrowItemId" };
  if (command.date < new Date()) return { error: "Invalid date" };

  return null;
}
