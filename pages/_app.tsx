import { Provider } from "components/ui/provider";
import Head from "next/head";
import { AppProps } from "next/app";

const Website = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Sergio Aramburu</title>
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default Website;
