import App, { AppProps } from "next/app";
import { StrictMode } from "react";
import Router from "next/router";
import { ApolloProvider } from "@apollo/react-hooks";
import { DefaultSeo } from "next-seo";
import { ApolloClient } from "apollo-client";
import { ToastProvider } from "react-toast-notifications";
import Page from "components/layout/Page";
import { withApollo } from "lib/hook/withApollo";
import { SEPARATOR } from "config";
import { initGA, logPageView } from "utils/functions";
import { ProvideAuth } from "lib/hook/useAuth";
import cookie from "react-cookies";
import { AnimatePresence, motion } from "framer-motion";

import "../node_modules/highlight.js/styles/atom-one-dark.css";
import "../static/nprogress.css";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "styles/Themes";

interface IApolloClient {
  apollo: ApolloClient<any>;
}

interface AppState {
  jwt: string | null;
  user: object | null;
}

class MyApp extends App<AppProps & IApolloClient, {}, AppState> {
  constructor(props: AppProps & IApolloClient) {
    super(props);

    // Setup state
    this.state = {
      jwt: null,
      user: null,
    };
  }

  componentDidMount() {
    // Initialize Google Analytics and log page changes
    initGA();
    Router.events.on(`routeChangeComplete`, logPageView);

    // get the jwt from cookies if it exists
    const jwt = cookie.load("jwt");
    const user = cookie.load("user");
    if (jwt) {
      this.setState({
        jwt: jwt,
        user: user,
      });
    }
  }

  componentWillUnmount() {
    Router.events.off(`routeChangeComplete`, logPageView);
  }

  render() {
    const { Component, apollo, pageProps, router } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <ProvideAuth jwt={this.state.jwt} user={this.state.user}>
            <DefaultSeo
              titleTemplate={`ChristopherLeeMiller.me ${SEPARATOR} %s`}
              facebook={{
                appId: process.env.FB_APP_ID,
              }}
              openGraph={{
                locale: `en_IE`,
                site_name: `ChristopherLeeMiller.me`,
              }}
              twitter={{
                handle: `@ChrisLMiller_me`,
                cardType: `summary_large_image`,
              }}
            />

            <GlobalStyles />
            <ToastProvider>
              <AnimatePresence exitBeforeEnter>
                <motion.div initial="exit" animate="enter" exit="exit">
                  <Page>
                    <StrictMode>
                      <Component {...pageProps} key={router.route} />
                    </StrictMode>
                  </Page>
                </motion.div>
              </AnimatePresence>
            </ToastProvider>
          </ProvideAuth>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo()(MyApp);
