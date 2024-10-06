import { EUpdateProfileType, IUser } from '@/features/user/interfaces';
import { updateUserInfo } from '@/features/user/userActions';
import { useAppDispatch } from '@/store/hooks';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
  user: IUser;
  updateType: string;
  onClose: () => void;
};

export const useUpdateProfilePopupHooks = ({ user, updateType, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [valueUpdate, setValueUpdate] = useState<string>('');
  const [boolUpdate, setBoolUpdate] = useState<boolean>(false);

  const renderTitle = useMemo(() => {
    if (updateType === EUpdateProfileType.name) {
      return 'Update Name';
    } else if (updateType === EUpdateProfileType.email) {
      return 'Update Email';
    } else if (updateType === EUpdateProfileType.payAsYouGoMode) {
      return 'Update Pay As You Go Mode';
    } else {
      return 'Update Password';
    }
  }, [updateType]);

  const renderPlaceholderInput = useMemo(() => {
    if (updateType === EUpdateProfileType.name) {
      return 'Add name here';
    } else if (updateType === EUpdateProfileType.email) {
      return 'Add email here';
    } else {
      return 'Add password here';
    }
  }, [updateType]);

  const renderValueInput = useMemo(() => {
    if (user) {
      if (updateType === EUpdateProfileType.name) {
        return user.firstName + ' ' + user.lastName;
      } else if (updateType === EUpdateProfileType.email) {
        return user.email;
      } else if (updateType === EUpdateProfileType.payAsYouGoMode) {
        return user.payAsYouGoMode;
      } else {
        return '••••••••••••';
      }
    }
    return '';
  }, [updateType, user]);

  const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValueUpdate(value);
  }, []);

  const onChangeBool = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setBoolUpdate(value);
  }, []);

  const onUpdateProfile = useCallback(async () => {
    if (valueUpdate.trim()) {
      onClose();
      if (updateType === EUpdateProfileType.name) {
        await dispatch(
          updateUserInfo({
            lastName: valueUpdate,
          })
        );
      }
    }

    if (updateType === EUpdateProfileType.payAsYouGoMode) {
      await dispatch(
        updateUserInfo({
          payAsYouGoMode: boolUpdate,
        })
      );
    }
  }, [valueUpdate, boolUpdate, onClose]);

  useEffect(() => {
    if (renderValueInput) {
      if (updateType === EUpdateProfileType.payAsYouGoMode) {
        return setBoolUpdate(renderValueInput as boolean);
      } else {
        setValueUpdate(renderValueInput as string);
      }
    }
  }, [renderValueInput]);

  return {
    renderTitle,
    renderPlaceholderInput,
    valueUpdate,
    boolUpdate,
    onChangeValue,
    onUpdateProfile,
    onChangeBool,
  };
};
