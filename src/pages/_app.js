import '@/styles/globals.css'
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../app/store';
import Layout from "@/components/Layout";
import { useRouter } from 'next/router';
import Selection from "@/components/Selection"
import { AppProvider } from "@/context/app";

export default function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <Selection>
            <Component {...pageProps} />
          </Selection>
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}