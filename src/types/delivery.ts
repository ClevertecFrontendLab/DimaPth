export interface IDelivery {
    id: number,
    handed: boolean,
    dateHandedFrom: string | null;
    dateHandedTo: string | null;
    recipientId: number | null,
    recipientFirstName: string | null,
    recipientLastName: string | null,
}