import React from 'react';
import Header from '@/components/Header';

const headerTableOne = [
  {
    id: '1',
    name: 'Book ID',
  },
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
    name: 'Thành viên',
  },
  {
    id: '6',
    name: 'Ngày mượn',
  },
  {
    id: '86',
    name: 'Ngày trả',
  },
];

const AdminBooks: React.FC = () => {
  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={true} />
      <div className="h-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
       
      </div>
    </div>
  );
};

export default AdminBooks;
