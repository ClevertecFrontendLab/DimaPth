export interface IBooking {
    id: string,
    order: boolean,
    dateOrder: string | null,
    customerId: number | null,
    customerFirstName: string | null,
    customerLastName: string | null,
}