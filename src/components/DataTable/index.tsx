import { ReactNode } from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export const DataTable = <T extends {}>({ data, columns }: DataTableProps<T>) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-base text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.header + index}
                className="px-6 py-3"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b hover:bg-gray-50"
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={column.header + columnIndex}
                  className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap capitalize"
                >
                  {row[column.accessor] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
