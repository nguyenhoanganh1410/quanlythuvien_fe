import * as Yup from 'yup';
import { useFormik } from 'formik';
import { REQUIRED_FIELD } from '@/constants';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createRequest } from '@/features/supportCenter/supportCenterActions';
import { toast } from 'react-toastify';
import { RootState } from '@/store';
import { createConversationChatBox } from '@/features/supportCenter/supportCenterActions';
import { ISupportContactFormRequest } from '@/features/supportCenter/interfaces';

export const OPTIONS_DATA = [
  {
    value: 'Getting_Started',
    name: 'Getting Started',
  },
  {
    value: 'Business_Tools',
    name: 'Business Tools',
  },
  {
    value: 'Account_Management',
    name: 'Account Management',
  },
  {
    value: 'Team_Sharing',
    name: 'Team Sharing',
  },
  {
    value: 'Index_Web',
    name: 'Index Web',
  },

  {
    value: 'Number_Porting',
    name: 'Number Porting',
  },
  {
    value: 'Troubleshooting',
    name: 'Troubleshooting',
  },
  {
    value: 'Privacy',
    name: 'Legal, Abuse, & Privacy',
  },
  {
    value: 'Orther',
    name: 'Orther',
  },
];

const initialValues = {
  type: 'Getting Started',
  title: '',
  feedback: '',
};

export const useRequestModelHooks = (open: boolean, onClose: () => void, articleId?: number) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.supportCenterStore);
  const { user } = useAppSelector((state: RootState) => state.userStore);

  const handleSubmit = useCallback(
    async (values: any) => {
      const dataPayload = {
        type: values.type,
        title: values.title,
        article_id: articleId ? articleId : null,
        content: values.feedback,
      };

      if (user) {
        const requestHub: ISupportContactFormRequest = {
          title: values.title,
          email: user.email,
          name: user.firstName + ' ' + user.lastName,
          phoneNumber: '',
          message: values.feedback,
          typeFeedback: values.type,
          type: 'formSupportCenter',
        };

        await dispatch(createRequest(dataPayload));
        dispatch(createConversationChatBox(requestHub));

        if (error) {
          toast('Form submitted failed!', {
            type: 'error',
            position: 'bottom-center',
            theme: 'light',
            autoClose: 500,
            hideProgressBar: true,
            closeButton: false,
            bodyClassName: 'toast-body',
          });
        } else {
          toast('Form submitted successfully!', {
            type: 'success',
            position: 'bottom-center',
            theme: 'light',
            autoClose: 500,
            hideProgressBar: true,
            closeButton: false,
            bodyClassName: 'toast-body',
          });
        }
        formik.resetForm();
        onClose();
      }
    },
    [dispatch, error, articleId, isLoading, user]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().trim().required(REQUIRED_FIELD),
      feedback: Yup.string().trim().required(REQUIRED_FIELD),
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return {
    formik,
    isLoading,
  };
};
