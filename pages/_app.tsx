import { Provider } from "components/ui/provider";
import Head from "next/head";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

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

export default appWithTranslation(Website);
