export interface TypesFile {
    label: string;
    value: string;
}

export interface dropdownType {
    label    : string;
    value    : string | number;
    inactive?: boolean;
}

export interface EventImage {
    currentFiles: File[];
    files: FileList;
    originalEvent: Event;
}

export const typesFileData: TypesFile[] = [
    { label: 'PDF',  value: 'PDF'  },
    { label: 'CSV',  value: 'CSV'  },
    { label: 'XML',  value: 'XML'  },
    { label: 'RFT',  value: 'RFT'  },
    { label: 'HTML', value: 'HTML' },
    { label: 'XLS',  value: 'XLS'  }
];