import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // this helps to persist the login state as we navigate
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
