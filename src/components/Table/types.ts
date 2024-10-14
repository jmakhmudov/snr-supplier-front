export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T, onDelete?: (id: string) => void) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onDelete?: (id: string) => void;
}