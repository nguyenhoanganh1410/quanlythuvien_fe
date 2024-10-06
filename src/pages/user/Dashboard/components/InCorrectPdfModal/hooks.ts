import { uploadPolicyFile } from '@/features/policy/policyActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useState } from 'react';

type Props = {
  onClose: () => void;
};

export const useInCorrectPdfModalHooks = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { fromData } = useAppSelector((state: RootState) => state.policyStore);
  const [step, setStep] = useState<number>(1);
  const [isChecked, setIsChecked] = useState(false);

  const continueUploadPDFfile = useCallback(async () => {
    setStep(2);
    if (step === 2) {
      onClose();
      setStep(1);
      await dispatch(uploadPolicyFile(fromData));
    }
  }, [step]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClose = useCallback(() => {
    setIsChecked(false);
    setStep(1);
    onClose();
  }, [onClose]);

  return {
    step,
    isChecked,
    continueUploadPDFfile,
    handleCheckboxChange,
    handleClose,
  };
};
