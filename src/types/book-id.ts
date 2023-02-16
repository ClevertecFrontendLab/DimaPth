import { IBooking } from './booking';
import { IDelivery } from './delivery';
import { IHistories } from './histories';

interface IComments {
    id: number,
    rating: number,
    text: string | null,
    createdAt: string,
    user: {
        commentUserId: number,
        firstName: string,
        lastName: string,
        avatarUrl: string | null;
    }
}

export interface IBook {
    issueYear: string | null,
    rating: number | null,
    title: string,
    authors: string[],
    images: Array<{url: string | null}>,
    categories: string[],
    id: number,
    booking: IBooking | null,
    delivery: IDelivery | null;
    histories: IHistories | null;
    description: string | null;
    publish: string | null;
    pages: string | null;
    cover: string | null;
    weight: string | null;
    format: string | null;
    ISBN: string | null;
    producer: string | null;
    comments: IComments[] | null;
}