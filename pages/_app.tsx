import '../styles/globals.scss';
import ContentLayout from '../shared/layout-components/layout/content-layout';
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import Landinglayout from '@/shared/layout-components/layout/landing-layout';
import SomeComponent from './myprotected';
import { Provider } from 'react-redux';
import store from '@/shared/redux/store';

const layouts: any = {

  Contentlayout: ContentLayout,
  Landinglayout: Landinglayout,
  Authenticationlayout: Authenticationlayout,

};
function MyApp({ Component, pageProps }: any) {

  const Layout = layouts[Component.layout] || ((pageProps: any) => <Component>{pageProps}</Component>);

  return (
    <Provider store={store}>
        <Layout>
        <SomeComponent pageProps={pageProps}>
          <Component {...pageProps} />
        </SomeComponent>
        </Layout>
    </Provider>
  )
}

export default MyApp;