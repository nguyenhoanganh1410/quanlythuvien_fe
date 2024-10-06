import { FC } from 'react';
import { usePaymentMethodsHooks } from './hooks';
import { icons } from '@/constants';
import CardSetupForm from '../CardSetupForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DeleteCardModal from '@/pages/user/Settings/components/DeleteCardModal';

type IProps = {};

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY ?? '');

const PaymentMethods: FC<IProps> = () => {
  const {
    listCards,
    isOpenCardSetupForm,
    cardId,
    isOpenDeleteModal,
    onAddPaymentMethod,
    onCloseCardSetupForm,
    onDeleteModal,
    onCloseDeleteModal,
  } = usePaymentMethodsHooks();

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-10 p-10 md:grid-cols-2">
      {listCards && listCards.length > 0 && (
        <>
          {listCards.map((card) => (
            <div className="flex h-56 w-full flex-col justify-between rounded-2xl border border-gray-300 bg-gray-100 px-6 py-4">
              <div className="flex flex-row items-center justify-between">
                <button onClick={async () => onDeleteModal(card.cardId)}>
                  <img className="cursor-pointer" src={icons.xMarkCircle} alt="xMark icon" />
                </button>
                <img src={icons.visa} alt="visa icon" />
              </div>
              <div className="flex flex-row items-center justify-center space-x-4 text-4xl font-bold text-gray-800">
                <p>····</p>
                <p>····</p>
                <p>····</p>
                <p className="text-3xl">{card.last4}</p>
              </div>
              <div className="flex flex-row items-end justify-between">
                <div className="flex flex-col space-y-1 text-gray-800">
                  <p className="text-[9.5px] font-normal">Card holder name</p>
                  <p className="text-sm font-bold">{card.name}</p>
                </div>
                <div className="flex flex-col space-y-1 text-gray-800">
                  <p className="text-[9.5px] font-normal">Expiry date</p>
                  <p className="text-sm font-bold">
                    {card.expMonth}/{card.expYear}
                  </p>
                </div>
                <img src={icons.chip} alt="chip icon" />
              </div>
            </div>
          ))}
        </>
      )}
      <button
        onClick={onAddPaymentMethod}
        className="flex h-56 w-full items-center justify-center rounded-2xl border border-gray-300 bg-gray-100"
      >
        <img src={icons.addPaymentMethods} alt="add icon" />
      </button>
      <Elements stripe={stripePromise}>
        <CardSetupForm open={isOpenCardSetupForm} onClose={onCloseCardSetupForm} />
      </Elements>
      <DeleteCardModal open={isOpenDeleteModal} onClose={onCloseDeleteModal} cardId={cardId} />
    </div>
  );
};

export default PaymentMethods;
