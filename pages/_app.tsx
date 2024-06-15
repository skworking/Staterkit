import '../styles/globals.scss';
import ContentLayout from '../shared/layout-components/layout/content-layout';
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import Landinglayout from '@/shared/layout-components/layout/landing-layout';
import SomeComponent from './myprotected';
import { Provider } from 'react-redux';
import store from '@/shared/redux/store';
import { SessionProvider } from 'next-auth/react';
const layouts: { [key: string]: React.ComponentType<any> } = {

  Contentlayout: ContentLayout,
  Landinglayout: Landinglayout,
  Authenticationlayout: Authenticationlayout,

};
function MyApp({ Component, pageProps:{session, ...pageProps} }: any) {

  const Layout = layouts[Component.layout] || ((pageProps: any) => <Component>{pageProps}</Component>);

  return (
    <SessionProvider session={session}>

    <Provider store={store}>
        <Layout>
        <SomeComponent pageProps={pageProps}>
          <Component {...pageProps} />
        </SomeComponent>
        </Layout>
    </Provider>
    </SessionProvider>
  )
}

export default MyApp;