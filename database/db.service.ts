import { IBorrowItem } from "../models/borrow-item.model";
import { IReservationAddCommand } from "../models/reservation.command";
import { IReservation } from "../models/reservation.model";
import { IUser } from "../models/user.model";

export function getAllUsers(): IUser[] {
  return users;
}

export function getAllReservations(): IReservation[] {
  return reservations;
}

export function getAllBorrowItems(): IBorrowItem[] {
  return readBorrowItems();
}

export function addReservation(command: IReservationAddCommand): void {
  const newId = (reservations[reservations.length - 1]?.id ?? 0) + 1;
  reservations.push({
    id: newId,
    borrowItemId: command.borrowItemId,
    userId: command.userId,
    date: command.date,
    description: command.description,
  });
}

function readBorrowItems(): IBorrowItem[] {
  return [
    {
      id: 1,
      name: "Book",
      description: "A novel about love and adventure",
      category: "Fiction",
      owner: "John",
      borrower: "Mary",
      status: "Borrowed",
    },
    {
      id: 2,
      name: "Laptop",
      description: "A high-performance laptop for gaming and work",
      category: "Electronics",
      owner: "Jane",
      borrower: "",
      status: "Available",
    },
    {
      id: 3,
      name: "Bicycle",
      description: "A mountain bike for off-road adventures",
      category: "Sports",
      owner: "Peter",
      borrower: "",
      status: "Available",
    },
    {
      id: 4,
      name: "Camera",
      description: "A professional camera for photography enthusiasts",
      category: "Electronics",
      owner: "Sarah",
      borrower: "Tom",
      status: "Borrowed",
    },
  ];
}

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();

let reservations: IReservation[] = [
  { id: 1, borrowItemId: 1, userId: 1, date: new Date(), description: "Brauche ich für die Gäste!" },
  { id: 2, borrowItemId: 2, userId: 1, date: new Date(), description: "Bitte bei mir melden, wenn trotzdem benötigt" },
  { id: 2, borrowItemId: 2, userId: 1, date: (new Date(year, month, date + 1)), description: "Brauche ich dringend!" },
  { id: 2, borrowItemId: 2, userId: 1, date: (new Date(year, month, date + 2)), description: "Für den Geburtstag von Yannick" },
];

let users: IUser[] = [{ id: 1, username: "user1" }];
