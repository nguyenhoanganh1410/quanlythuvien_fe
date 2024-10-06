import { IBook } from '@/features/books/interfaces';

interface IHeaderTable {
  id: string;
  name: string;
}
interface IProps {
  headerTable: IHeaderTable[];
  tableData: IBook[];
}

const TableComponent = ({ headerTable, tableData }: IProps) => {
  return (
    <div className="max-h-[64vh] overflow-x-auto rounded-lg border bg-white pt-4 shadow">
      <div className="relative">
        <table className="w-full rounded-sm text-left text-sm">
          <thead className="text-xs uppercase">
            <tr>
              {headerTable.map((item) => {
                return (
                  <th key={item.id} scope="col" className="px-6 py-3">
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((book) => {
              return (
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium text-gray-900 hover:text-orange-500 hover:underline dark:text-white"
                  >
                    #{book.ISBN}
                  </th>
                  <td className="px-6 py-4 font-DMSans text-sm capitalize">{book.title}</td>
                  <td className="px-6 py-4 font-DMSans text-sm capitalize">{book.authName}</td>
                  <td className="px-6 py-4 font-DMSans text-sm capitalize">{book.quanlity}</td>
                  <td className="px-6 py-4 font-DMSans text-sm capitalize">{book.type}</td>
                  <td className="px-6 py-4 font-DMSans text-sm capitalize">{book.language}</td>
                  {book.status && (
                    <div className='flex items-center px-6 py-4 gap-1'>
                      <div className='w-[6px] h-[6px] bg-green-500 rounded mt-1'></div>
                      <td className="">active</td>
                    </div>
                  )}
                    {!book.status && (
                    <div className='flex items-center px-6 py-4 gap-1'>
                      <div className='w-[6px] h-[6px] bg-red-500 rounded mt-1'></div>
                      <td className="">disactive</td>
                    </div>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
