import { IPolicy } from '@/features/policy/interfaces';
import { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  currentPolicy: IPolicy;
};

const useShareEmailPolicyHooks = ({ currentPolicy }: Props) => {
  const [valueEmailInput, setValueEmailInput] = useState<string>('');

  const onChangeValueEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setValueEmailInput(text);
  }, []);

  const onShare = useCallback(async () => {
    const host = 'policyholder.' + window.location.host;
    const protocol = window.location.protocol;
    const inviteLink = protocol + '//' + host + `?policyId=${currentPolicy.id}`;
    console.log('inviteLink: ', inviteLink);
  }, [currentPolicy]);

  return {
    valueEmailInput,
    onChangeValueEmail,
    onShare,
  };
};

export default useShareEmailPolicyHooks;
