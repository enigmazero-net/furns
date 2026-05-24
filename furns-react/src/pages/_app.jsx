import Head from "next/head";
import { Fragment } from "react";
import { Provider } from "react-redux";
import BootstrapProvider from "@bootstrap";
import { ThemeProvider, theme } from "@styled";
import { store } from "@global/store";
import { GlobalStyle } from "@assets/css/global.style";

// CSS import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "react-perfect-scrollbar/dist/css/styles.css";

// Fonts Import
import "@fontsource/raleway";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/300-italic.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";

// Customize Bootstrap
const themeBootstrap = {
  "$container-max-widths": {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1200px",
  },
};

const FurnsAPP = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <title>Furns :: React Next JS Furniture eCommerce Template</title>
        <meta
          name="description"
          content="React Next JS Furniture eCommerce Template by Hasthemes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <BootstrapProvider theme={themeBootstrap} reset={true}>
          <GlobalStyle />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </BootstrapProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default FurnsAPP;
