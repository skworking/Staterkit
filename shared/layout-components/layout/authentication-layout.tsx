import React, { Fragment, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { checkAuthentication } from '@/shared/redux/action';
import { RootState, AppDispatch } from '@/shared/redux/store';
import Switcher from '../switcher/switcher';

interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.isAuth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    const username = sessionStorage.getItem('user');
    if (token) {
      dispatch(checkAuthentication(true, token));
    } else {
      dispatch(checkAuthentication(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      router.replace('/'); // Assuming your login page route is /login
    }
  }, [isAuth, router]);

  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <body className='' />
        </Helmet>
        {isAuth ? (
          <>
            {children}
            <Switcher />
          </>
        ) : <>auth child</>}
      </HelmetProvider>
    </Fragment>
  );
};

export default AuthenticationLayout;
