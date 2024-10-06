import { IPolicy, IUpdatePolicyFormRequest, IUpdatePolicyRequest } from '@/features/policy/interfaces';
import { updatePolicy } from '@/features/policy/policyActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useMemo } from 'react';

type Props = {
  currentPolicy: IPolicy | null;
  onClose: () => void;
};

const useEditPolicyFormHooks = ({ currentPolicy, onClose }: Props) => {
  const { isUpdatingPolicy } = useAppSelector((store) => store.policyStore);
  const dispatch = useAppDispatch();

  const initialValues: IUpdatePolicyFormRequest = useMemo(() => {
    return {
      firstName: (currentPolicy && currentPolicy.firstName) ?? '',
      provider: (currentPolicy && currentPolicy.provider) ?? '',
      fullAddress: (currentPolicy && currentPolicy.address?.full) ?? '',
      policyNumber: (currentPolicy && currentPolicy.policyNumber) ?? '',
      claimNumber: (currentPolicy && currentPolicy.claimNumber) ?? '',
    };
  }, [currentPolicy]);

  const onSubmitForm = useCallback(
    async (values: IUpdatePolicyFormRequest) => {
      if (currentPolicy) {
        try {
          const updatePolicyData: IUpdatePolicyRequest = {
            id: currentPolicy?.id,
            address: {
              full: values.fullAddress ?? '',
            },
            ...values,
          };
          await dispatch(updatePolicy(updatePolicyData));
        } catch (error) {
          console.log('Error when update policy: ', error);
        } finally {
          onClose();
        }
      }
    },
    [currentPolicy, dispatch, onClose]
  );

  return {
    isUpdatingPolicy,
    initialValues,
    onSubmitForm,
  };
};

export default useEditPolicyFormHooks;
