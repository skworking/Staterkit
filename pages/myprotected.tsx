import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/store';
import Firebaselogin from '@/pages';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React from 'react';

interface SomeComponentProps {
  children: React.ReactNode;
}

// const SomeComponent: React.FC<SomeComponentProps> = ({ children }) => {
  const SomeComponent = ({ children, pageProps }: { children: React.ReactNode; pageProps: any }) => {
  const isAuth = useSelector((state: RootState) => state.isAuth);
  const router = useRouter();
  const { pathname } = router;
console.log("protectpage",isAuth);


    // Redirect logic based on authentication status
    useEffect(() => {
      if (!isAuth && router.pathname !== '/login') {
        router.replace('/'); // Redirect to login if not authenticated and not already on login page
      }
    }, [isAuth, router]);
  
    if (!isAuth && router.pathname !== '/login') {
      return null; // Render nothing while redirecting
    }
  console.log(isAuth);
  return <>{React.cloneElement(children as React.ReactElement, { ...pageProps })}</>;
  // return <>{children}</>;
};

export default SomeComponent;
