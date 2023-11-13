export interface IReservationAddCommand {
  userId: number;
  borrowItemId: number;
  date: Date;
  description: string;
}