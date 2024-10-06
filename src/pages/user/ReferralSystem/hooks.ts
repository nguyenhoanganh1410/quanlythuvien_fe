import { PATHS } from '@/constants';
import { ICreateReferral } from '@/features/referral/interfaces';
import { createReferral } from '@/features/referral/referralActions';
import { useAppDispatch } from '@/store/hooks';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
export const useReferralSystemHooks = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refId = searchParams.get('refid');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: ICreateReferral = {
    name: '',
    phone: '',
    email: '',
    refId: refId ?? '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    phone: Yup.string().required('This field is required'),
    email: Yup.string().email('Invalid email').required('This field is required'),
  });

  const onSubmit = useCallback(async (values: ICreateReferral) => {
    try {
      setIsLoading(true);
      await dispatch(
        createReferral({
          name: values.name,
          phone: values.phone,
          email: values.email,
          refId: refId ?? '',
        })
      );
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: false,
  });

  const navHome = () => {
    window.location.href = PATHS.HOME;
  };

  return {
    formik,
    isLoading,
    navHome,
  };
};
