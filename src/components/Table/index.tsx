import { TableProps } from "./types";


export default function Table<T>({
  data,
  columns,
  onDelete,
}: TableProps<T>) {

  return (
    <section className="w-full overflow-x-scroll scroll-smooth bg-white rounded-md">
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
            <>
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td className="py-2 px-5 first:pl-5 last:pr-5" key={colIndex}>
                    {
                      col.render
                        ? col.render(row[col.accessor], row, onDelete)
                        : (row[col.accessor] as React.ReactNode)
                    }
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </section>
  )
}