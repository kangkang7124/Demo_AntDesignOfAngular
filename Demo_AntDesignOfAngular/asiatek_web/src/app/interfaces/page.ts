export interface Page {
    total: string;
    data?: [];
    pageNum: number;
    pageSize: number;
    [key: string]: any;
}
