import { REQUIRED_FIELD } from '@/constants';
import { creatBook, getListBooks } from '@/features/books/bookActions';
import { useAppDispatch } from '@/store/hooks';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

interface IProps {
  onCancel: () => void;
}

export const userModelAddBook = ({ onCancel }: IProps) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    ISBN: '',
    title: '',
    authName: '',
    type: '',
    quanlity: 0,
    language: '',
    image: '',
  };

  const onSubmit = useCallback(
    async (data: any) => {
      await dispatch(creatBook(data));
      await dispatch(getListBooks());
      onCancel();
    },
    [onCancel]
  );

  const formik: any = useFormik({
    initialValues,
    validationSchema: Yup.object({
      ISBN: Yup.string().trim().required(REQUIRED_FIELD),
      title: Yup.string().trim().required(REQUIRED_FIELD),
      authName: Yup.string().trim().required(REQUIRED_FIELD),
      type: Yup.string().trim().required(REQUIRED_FIELD),
      language: Yup.string().trim().required(REQUIRED_FIELD),
      quanlity: Yup.number()
        .typeError('Giá trị phải là một số')
        .required('Trường này là bắt buộc')
        .positive('Giá trị phải là số dương')
        .integer('Giá trị phải là số nguyên'),
    }),
    onSubmit,
    validateOnMount: false,
  });

  return {
    initialValues,
    formik,
  };
};
