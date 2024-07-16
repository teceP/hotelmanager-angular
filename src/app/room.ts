import { Booking } from "./booking";

export interface Room {
    id: number;
    name?: string;
    description?: string;
    hasMinibar?: boolean;
    roomSize?: string;
    bookings?: Booking[];
}