export interface IGetHistoryResponse {
    statusCode: number;
    message:    string;
    data:       Data[];
    metadata:   Metadata;
}

export interface Data {
    id:      number;
    type:    string;
    date:    Date;
    mileage: number;
    notes:   string;
}

export interface Metadata {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}
