import { IBooking } from "./booking";
import { IDelivery } from "./delivery";
import { IHistories } from "./histories";

export interface IBooks {
    issueYear: string | null,
    rating: number | null,
    title: string,
    authors: string[],
    image: {
        url: string | null,
    },
    categories: string[],
    id: number,
    booking: IBooking | null,
    delivery: IDelivery | null;
    histories: IHistories | null;
}