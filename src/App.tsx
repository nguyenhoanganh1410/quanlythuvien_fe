import React, { FC, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layouts/Layout';
import { PATHS, TITLE_PATHS } from './constants';
import { clearAlertStore } from './features/app/appSlice';
import { RootState } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import LoadingPage from './components/LoadingPage';
import { ProtectedRoute } from './components';
import { getProfile } from './features/user/userActions';
import ResetPasswordPage from './pages/common/ResetPassword';
import CookieConsent from 'react-cookie-consent';

// Common pages
const NotFoundPage = React.lazy(() => import('./pages/common/NotFound'));
const SignInPage = lazy(() => import('./pages/common/SignIn'));
const SignUpPage = lazy(() => import('./pages/common/SignUp'));

// Admin pages
const AdminDashboardPage = React.lazy(() => import('./pages/admin/dashboard'));
const AdminBookPage = React.lazy(() => import('./pages/admin/books'));
const SettingPage = React.lazy(() => import('./pages/admin/settings'));
// const ProjectResponsePage = React.lazy(() => import('./pages/user/ProjectResponse'));
// const AIResponsePage = React.lazy(() => import('./pages/user/AIResponse'));

const MainRoute: FC = () => {
  return (
    <Routes>
      <Route
        path={PATHS.HOME}
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path={PATHS.BOOKS} element={<AdminBookPage />} />
        <Route path={PATHS.SETTINGS} element={<SettingPage />} />
        {/* <Route
          path={PATHS.PROJECT_RESPONSE}
          element={
            <ProtectedRoute isAdminRequired>
              <ProjectResponsePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.AI_RESPONSE}
          element={
            <ProtectedRoute isAdminRequired>
              <AIResponsePage />
            </ProtectedRoute>
          }
        />
        <Route path={PATHS.HOME_VALUATION} element={<HomeValuationPage />} /> */}
      </Route>
      <Route path={PATHS.SIGN_UP}>
        <Route index element={<SignUpPage />} />
      </Route>
      <Route path={PATHS.SIGN_IN}>
        <Route index element={<SignInPage />} />
      </Route>
      <Route path={PATHS.RESET_PASSWORD}>
        <Route index element={<ResetPasswordPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state: RootState) => state.appStore);
  const { isAuthentication } = useAppSelector((state: RootState) => state.userStore);

  React.useEffect(() => {
    const getProfileUser = async () => {
      await Promise.all([dispatch(getProfile())]);
      if (location.pathname === PATHS.SIGN_IN || location.pathname === PATHS.SIGN_UP) {
        window.location.href = PATHS.HOME;
      }
    };
    if (isAuthentication) {
      getProfileUser();
    }
  }, [isAuthentication]);

  React.useEffect(() => {
    if (message && type) {
      toast(message, {
        type: type,
        position: 'bottom-right',
        theme: 'light',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toast-body',
      });
      setTimeout(() => dispatch(clearAlertStore()), 3000);
    }
  }, [dispatch, message, type]);

  React.useEffect(() => {
    document.title = TITLE_PATHS[location.pathname] ?? 'Not found';
  }, [location]);

  return (
    <React.Fragment>
      <React.Suspense fallback={<LoadingPage />}>
        <CookieConsent
          location="top"
          buttonText="Continue"
          cookieName="accept-cookies"
          style={{ background: '#2B373B', zIndex: 99999, border: '1px solid #f26525', borderRadius: '8px' }}
          buttonStyle={{ background: '#f26525', fontSize: '13px', borderRadius: '6px', color: '#fff' }}
          expires={150}
          overlay
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
        <MainRoute />;
      </React.Suspense>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
