import React from 'react';
import Header from '@/components/Header';
import TableComponent from './components/tablebooks';
import { SearchIcon } from '@/icons';
import { useAdminBookHooks } from './hooks';
import ModelAddBook from './components/addbook';

const headerTable = [
  {
    id: '12',
    name: 'ISBN',
  },
  {
    id: '2',
    name: 'Tiêu đề',
  },
  {
    id: '3',
    name: 'Tác giả',
  },
  {
    id: '4',
    name: 'Số lượng',
  },
  {
    id: '6',
    name: 'Thể loại',
  },
  {
    id: '896',
    name: 'Ngôn ngữ',
  },
  {
    id: '86',
    name: 'Trạng thái',
  },
];

const AdminBooks: React.FC = () => {
  const { listBooks, showModelAddBook, onShowModeAddBook, onCloseModeAddBook } = useAdminBookHooks();
  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={true} />
      <div className="h-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {showModelAddBook ? (
          <ModelAddBook onCancel={onCloseModeAddBook} />
        ) : (
          <React.Fragment>
            <div className="my-4 flex items-center justify-between">
              <p className="text-xl font-bold">Danh sách Sách</p>

              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-[300px] items-center rounded-lg border bg-white px-4 py-5">
                  <div className="cursor-pointer">
                    <SearchIcon />
                  </div>
                  <input
                    type="search"
                    placeholder="Nhập ISBN, tiêu đề sách..."
                    className=" w-full border-none  bg-transparent text-sm font-normal focus:border-none"
                  />
                </div>
                <button
                  onClick={() => onShowModeAddBook()}
                  className="rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  Tạo Mới
                </button>
              </div>
            </div>
            <TableComponent tableData={listBooks.items} headerTable={headerTable} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
