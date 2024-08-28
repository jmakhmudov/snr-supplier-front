import { TableProps } from "./types";

import { IoMdMore } from "react-icons/io";

export default function Table<T>({
  data,
  columns,
}: TableProps<T>) {

  return (
    <section className="w-full overflow-x-scroll scroll-smooth">
      <table className="text-left min-w-full text-sm">
        <thead className="bg-gray-light text-gray-500">
          <tr>
            {columns.map((col, index) => (
              <th className="text-xs font-medium py-2 px-5 first:pl-5 last:pr-5" key={index}>
                {col.header}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td className="py-2 px-5 first:pl-5 last:pr-5" key={colIndex}>
                  {
                    col.render
                      ? col.render(row[col.accessor], row)
                      : (row[col.accessor] as React.ReactNode)
                  }
                </td>
              ))}
              <td className="cursor-pointer">
                <IoMdMore size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}