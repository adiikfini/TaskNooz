export interface Item {
    id: string;
    content: string;
}

export interface Column {
    id: string;
    title: string;
    items: Item[];
}

export interface Board {
    columns: {
        [key: string]: Column;
    };
    columnOrder: string[];
}