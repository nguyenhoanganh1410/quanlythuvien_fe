import React from 'react';
import Header from '@/components/Header';
import CardItem from '@/components/CardItem';
import TableComponent from '@/components/Table';
import { useAdminDashboardHooks } from './hooks';

const initialCards = [
  {
    id: 'card_01',
    value: `1000`,
    title: 'Tổng số sách',
    progress: 90,
    price: 0,
    progressColor: '#EE8062',
  },
  {
    id: 'card_02',
    value: '100',
    title: 'Số sách đang cho mượn',
    progress: 45,
    progressColor: '#7785DE',
  },
  {
    id: 'card_04',
    value: `20`,
    title: 'Số sách quá hạn',
    progress: 45,
    progressColor: '#FAC76F',
  },
  {
    id: 'card_04',
    value: `20`,
    title: 'Tổng số thành viên',
    progress: 45,
    progressColor: '#FAC76F',
  },
];

// const headerTableOne = [
//     {
//         id: '1',
//         name: 'Book ID'
//     },
//     {
//         id: '12',
//         name: 'ISBN'
//     },
//     {
//         id: '2',
//         name: 'Tiêu đề'
//     },
//     {
//         id: '3',
//         name: 'Tác giả'
//     },
//     {
//         id: '4',
//         name: 'Số lượng'
//     },
// ]

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

const AdminDashboard: React.FC = () => {
  const { getFullName } = useAdminDashboardHooks();
  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={true} />
      <div className="h-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="flex w-full flex-col items-start justify-start md:flex-row">
          <div className="flex flex-col">
            <h1 className="font-SpaceGrotesk mb-2 text-2xl font-semibold capitalize text-blackLight">
              Hi {getFullName},
            </h1>
            <p className="font-SpaceGrotesk text-sm font-normal text-grayLight">Chào mừng trở lại thư viện VinhUni!</p>
          </div>
        </div>

        <div className="2xl:gap-7.5 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6 2xl:mt-8">
          {initialCards.map((item) => (
            <CardItem
              value={item.value}
              title={item.title}
              progress={item.progress}
              key={item.id}
              progressColor={item.progressColor}
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6">
          <TableComponent headerTable={headerTableOne} tableTitle="Danh sách cho mượn" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
