import { FC } from 'react';
import { useOrderHistoryHooks } from './hooks';
import moment from 'moment';
import { LIST_ORDERS } from '@/constants';
import clsx from 'clsx';
import { EOrderHistoryStatus } from '@/constants/enum';
import Spinner from '@/components/LoadingPage/Spinner';

interface IProps {}

const OrderHistory: FC<IProps> = () => {
  const { transactionsHistory, isLoading, onOpenInvoice } = useOrderHistoryHooks();
  if (isLoading) {
    return <Spinner />;
  }
  if (!transactionsHistory) {
    return (
      <div className="w-full max-w-7xl p-10">
        <p>No Order History</p>
      </div>
    );
  }
  return (
    <div className="w-full p-4 md:max-w-7xl md:p-10">
      <table className="w-full md:min-w-[450px]">
        <thead className="border-b-2 border-gray-200 bg-secondary text-center">
          <tr className="text-medium h-14 text-center text-3xs text-white md:text-base">
            <th className="rounded-tl-lg">Date</th>
            <th>Description</th>
            <th>Amount paid</th>
            <th>Status</th>
            <th className="rounded-tr-lg">Invoice</th>
          </tr>
        </thead>
        <tbody className="py-5 text-center text-3xs md:text-base">
          {transactionsHistory?.map((item, index) => (
            <tr
              key={item.id}
              className={clsx(
                'h-14 border-b-2 border-gray-200 bg-white',
                item.status === EOrderHistoryStatus.succeeded ? 'text-gray-800' : 'text-primary'
              )}
            >
              <td className={clsx(index === LIST_ORDERS.length - 1 && 'rounded-bl-lg')}>
                {moment(item.created * 1000).format('MM/DD/YYYY')}
              </td>
              <td>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <p>{item.description}</p>
                </div>
              </td>
              <td>{item.amount ? `$${item.amount / 100}` : '-'}</td>
              <td>
                <div className="flex w-full items-center justify-center">
                  <div
                    className={clsx(
                      'w-fit rounded-lg border border-primary bg-primary px-2.5 py-1.5 font-DMSans text-3xs font-medium uppercase md:text-sm ',
                      item.status === EOrderHistoryStatus.succeeded
                        ? 'bg-opacity-100 text-white'
                        : 'bg-opacity-5 text-primary'
                    )}
                  >
                    {item.status === EOrderHistoryStatus.succeeded ? 'succeeded' : 'failure'}
                  </div>
                </div>
              </td>
              <td className={clsx(index === LIST_ORDERS.length - 1 && 'rounded-br-lg')}>
                <div
                  className="flex w-full cursor-pointer items-center justify-center"
                  onClick={() => onOpenInvoice(item.invoice)}
                >
                  <a
                    className={clsx(
                      'w-fit rounded-lg border border-primary bg-primary bg-opacity-100 px-2.5 py-1.5 font-DMSans text-3xs font-medium uppercase text-white md:text-sm'
                    )}
                  >
                    Watch
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
