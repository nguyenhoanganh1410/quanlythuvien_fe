import { ErrorMessage, ErrorMessageProps } from 'formik';
import { FC } from 'react';

interface IProps extends ErrorMessageProps {}

const ErrorMessageForm: FC<IProps> = ({ ...props }) => {
  return (
    <ErrorMessage {...props}>
      {(message: string) => <p className="mt-1 font-DMSans text-xs font-medium text-red-500">{message}</p>}
    </ErrorMessage>
  );
};

export default ErrorMessageForm;
