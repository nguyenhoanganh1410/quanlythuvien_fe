interface IHeaderTable {
  id: string;
  name: string;
}
interface IProps {
  headerTable: IHeaderTable[];
  tableTitle: string;
}

const TableComponent = ({ headerTable, tableTitle }: IProps) => {
  return (
    <div className="max-h-[45vh] overflow-x-auto rounded-lg border bg-white pt-4 shadow">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold text-orange-500">{tableTitle}</h2>
        <p className="text-xs text-orange-500 cursor-pointer hover:underline">Xem tất cả</p>
      </div>
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
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th scope="row" className="whitespace-nowrap hover:underline cursor-pointer px-6 py-4 font-medium text-gray-900">
                #121345
              </th>
              <td className="px-6 py-4">423423</td>
              <td className="px-6 py-4">Nhà Giả Kim</td>
              <td className="px-6 py-4">Paulo Coelho</td>
              <td className="px-6 py-4">Member 01</td>
              <td className="px-6 py-4">08/10/2024</td>
              <td className="px-6 py-4">14/10/2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
