import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import nProgress from "nprogress";
import dynamic from "next/dynamic";
const AuthProvider = dynamic(() => import("../components/AuthProvider"));

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log("router.asPath", router.asPath);
  const [tabValue, setTabValue] = useState(router.asPath || "/");

  function redirectAndSetTabValue(href: string) {
    setTabValue(href);
    router.push(href);
  }

  useEffect(() => {
    setTabValue(router.asPath);
  }, [router.asPath]);
  useEffect(() => {
    (async () => {
      router.events.on("routeChangeStart", () => nProgress.start());
      router.events.on("routeChangeComplete", () => nProgress.done());
      router.events.on("routeChangeError", () => nProgress.done());
    })
  }, [router.events]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} tabValue={tabValue} />
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          transition={Slide}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </>
  );
}

export default MyApp;
