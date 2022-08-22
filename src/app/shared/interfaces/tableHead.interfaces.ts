import { SortMeta } from "primeng/api";

export interface TableHead {
    field: string;
    header: string;
}

export interface SortEventOrder {
    data: any[];
    mode: string;
    field: string;
    order: number;
    multiSortMeta?: SortMeta[];
}