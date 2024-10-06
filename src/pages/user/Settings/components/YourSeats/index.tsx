import { icons } from '@/constants';
import { FC, memo } from 'react';
import { useYourSeatsHooks } from './hooks';
import ConfirmPopups from '@/components/ConfirmPopups';
import SeatModel from '../SeatModel';
import { LoadingPage } from '@/components';
import PaginatedItems from './Paginate';

const YOUR_SEATS_HEADER = [
  {
    id: 'no',
    name: 'No',
  },
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'email',
    name: 'Email Address',
  },
  // {
  //   id: 'temporal',
  //   name: 'Temporal password',
  // },
  {
    id: 'actions',
    name: 'Actions',
  },
];

type Props = {};

const YourSeats: FC<Props> = ({}) => {
  const {
    seats,
    pageSize,
    pageCount,
    currentPage,
    isLoading,
    showModelDefine,
    showModelConfirm,
    onPageClick,
    onClickDelete,
    // onClickGenerate,
    onClickDefineNow,
    onCloseModelDefine,
    onClickAddMoreSeats,
    onCloseModelConfirm,
    onClickConfirmDelete,
  } = useYourSeatsHooks();

  return (
    <div className="p-8">
      {isLoading && <LoadingPage />}
      <div className="relative flex flex-col gap-4 overflow-x-auto bg-white p-8 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between">
          <div className="font-Inter text-2xl font-semibold text-slate-700">Your Seats</div>

          <div className="flex gap-2">
            <div
              onClick={() => onClickDefineNow()}
              className="flex h-10 max-w-[126px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 shadow"
            >
              <div className="text-center font-Lato text-base font-bold leading-tight text-slate-700">Define now</div>
            </div>
            <div
              onClick={onClickAddMoreSeats}
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 shadow hover:opacity-60"
            >
              <div className="text-center font-Lato text-base font-bold leading-tight text-white">Add more seats</div>
            </div>
          </div>
        </div>

        <table className="w-full p-4 text-left text-sm text-gray-500 rtl:text-right">
          <thead className="text-sm font-normal text-zinc-500">
            <tr className="border-b">
              {YOUR_SEATS_HEADER.map((item) => (
                <th key={item.id} scope="col" className="px-6 py-3 font-medium">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seats.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  className="cursor-pointer odd:bg-gray-50 even:bg-white hover:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-sm font-normal text-slate-700 dark:text-white"
                  >
                    {index + 1}.
                  </th>
                  <td className="px-6 py-4 text-sm font-medium capitalize text-slate-700">
                    {item?.userInfo?.firstName + ' ' + item?.userInfo?.lastName}
                  </td>
                  <td className="px-6 py-4 text-xs font-normal text-slate-700">{item?.userInfo?.email}</td>
                  {/* <td
                    onClick={() => onClickGenerate(item)}
                    className="px-6 py-4 text-xs font-normal text-slate-700 underline"
                  >
                    Generate
                  </td> */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2 pl-4">
                      <span onClick={() => onClickDelete(item)} className="hover:opacity-50">
                        <img alt="trash-fill" src={icons.deleteIcon} />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 flex w-full justify-center">
          <PaginatedItems
            handlePageClick={onPageClick}
            currentPage={currentPage - 1}
            itemsPerPage={pageSize}
            pageCount={pageCount}
          />
        </div>
        {!isLoading && seats.length == 0 && (
          <div className="flex w-full items-center justify-center">
            <span className="text-sm font-normal text-zinc-500">No data found.</span>
          </div>
        )}
      </div>
      <ConfirmPopups
        title="Are you sure you want to delete this seat?"
        onClose={onCloseModelConfirm}
        onConfirm={onClickConfirmDelete}
        open={showModelConfirm}
      />
      <SeatModel open={showModelDefine} onClose={onCloseModelDefine} />
    </div>
  );
};

export default memo(YourSeats);
