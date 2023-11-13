export interface IReservation {
  id: number;
  borrowItemId: number;
  borrowItemName?: string;
  userId: number;
  date: Date;
  description: string;
}