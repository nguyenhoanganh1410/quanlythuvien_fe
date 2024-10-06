import * as Yup from 'yup';
import { useFormik } from 'formik';
import { REQUIRED_FIELD } from '@/constants';
import { getListUserOptions } from '@/features/user/userActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createSeat } from '@/features/seat/seatActions';
import { toast } from 'react-toastify';
import { RootState } from '@/store';

interface ISeatModel {
  email: string;
}

const initialValues = {
  email: '',
};

export const useSeatModelHooks = (onClose: () => void) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.userStore);

  const handleSubmit = async (values: ISeatModel) => {
    const data = await dispatch(
      getListUserOptions({
        search: values.email,
      })
    );
    if (data.payload.totalCount == 0) {
      toast("Your email doesn't exist in system!", {
        type: 'error',
        position: 'bottom-center',
        theme: 'light',
        autoClose: 500,
        hideProgressBar: true,
        closeButton: false,
        bodyClassName: 'toast-body',
      });
      return;
    }
    await dispatch(
      createSeat({
        user_id: data.payload.options[0].id,
      })
    );
    onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required(REQUIRED_FIELD),
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
  });

  return {
    formik,
    isLoading,
  };
};
