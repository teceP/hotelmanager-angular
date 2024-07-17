export interface ApiError{
    path: string;
    message: string; 
    statusCode: number;
    localDateTime: Date;
    entries: Entry[];
}

export interface Entry{
    fieldName: string;
    message: string;
    invalidValue: any;
}