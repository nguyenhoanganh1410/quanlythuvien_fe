import { Formik } from 'formik';
import { FC } from 'react';
import { useLoginFormHooks } from './hooks';
import { ErrorMessageForm, LoadingPage } from '@/components';
import { resetPasswordSchema, signInValidator } from '@/core/utils';
import { icons } from '@/constants';

interface IProps {
}

const SignInForm: FC<IProps> = ({ }) => {
  const {
    isLoadingUser,
    isRequestingResetPassword,
    initialResetPasswordValues,
    initialValues,
    showPassword,
    onSubmitResetPasswordForm,
    onCloseResetPasswordForm,
    onSubmitForm,
    onSelectForgotPassword,
    onToggleShowPassword,
  } = useLoginFormHooks();

  return (
    <div className="flex w-full max-w-sm flex-col">
      <div className="mt-8">
        <div className="flex w-full flex-row items-center">
          <img src={icons.logo} className="mr-2 h-10 w-10" alt="logo" />
          <p className="text-[28px] font-bold text-secondary sm:text-[30px]">Thư Viện VinhUni</p>
        </div>
        <div className="mt-8">
          {isRequestingResetPassword ? (
            <Formik
              validationSchema={resetPasswordSchema}
              initialValues={initialResetPasswordValues}
              validateOnMount={false}
              onSubmit={onSubmitResetPasswordForm}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit} className="mt-8">
                  <p className="text-sm font-medium text-gray-800">Email</p>
                  <div className="relative mt-2 flex flex-row items-center justify-center">
                    <input
                      className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                      name="email"
                      type="email"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      placeholder="user@example.com"
                    />
                  </div>
                  <ErrorMessageForm name="email" />
                  <button className="mt-8 h-11 w-full rounded-lg bg-orange-500">
                    <p className="text-base font-medium text-white capitalize">Gửi yêu cầu</p>
                  </button>
                  <p
                    onClick={onCloseResetPasswordForm}
                    className="mt-2 cursor-pointer text-center text-sm font-semibold text-orange-500 underline"
                  >
                    Đăng Nhập
                  </p>
                </form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={signInValidator}
              initialValues={initialValues}
              validateOnMount={false}
              onSubmit={onSubmitForm}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <p className="text-sm font-medium text-gray-800">Email</p>
                  <div className="relative mt-2 flex flex-row items-center justify-center">
                    <input
                      className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                      name="email"
                      type="email"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      placeholder="user@example.com"
                    />
                  </div>
                  <ErrorMessageForm name="email" />
                  <p className="mt-5 text-sm font-medium text-gray-800">Mật Khẩu</p>
                  <div className="relative mt-2 flex flex-row items-center justify-center">
                    <input
                      className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      placeholder="***************"
                    />
                    <img
                      onClick={onToggleShowPassword}
                      alt="eye-icon"
                      src={showPassword ? icons.eye : icons.eyeSlash}
                      className="absolute right-4 cursor-pointer"
                    />
                  </div>
                  <ErrorMessageForm name="password" />
                  <div className="mt-5 flex flex-row items-center justify-end">
                    <p onClick={onSelectForgotPassword} className="cursor-pointer text-sm font-medium text-orange-500">
                      Quên mật khẩu
                    </p>
                  </div>
                  <button type="submit" className="mt-8 h-11 w-full rounded-lg bg-orange-500">
                    <p className="text-base font-medium text-white">Đăng Nhập</p>
                  </button>

                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
      {isLoadingUser && <LoadingPage />}
    </div>
  );
};

export default SignInForm;
