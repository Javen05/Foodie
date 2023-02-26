import { Box, Link, Tooltip, IconButton } from "@chakra-ui/react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import Index from "./pages/Index";
import Bookmarks from "./pages/Bookmarks";
import Favourites from "./pages/Favourites";

import Restaurant from "./pages/Restaurant";
import CookiePolicy from "./pages/misc/Cookie-Policy";
import TOS from "./pages/misc/TOS";
import PrivacyPolicy from "./pages/misc/Privacy-Policy";
import Register from "./pages/account/Register";
import Profile from "./pages/account/Profile";
import EditProfile from "./pages/account/EditProfile";
import ResetPassword from "./pages/account/ResetPassword";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CookieConsent from "react-cookie-consent";

import { useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";
import OnBoarding from "./components/OnBoarding";

function App() {
  const history = useHistory();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // scroll to top on route change

  useEffect(() => {
    document.title =
      "Foodie" +
      (location.pathname.slice(1)
        ? ` - ${location.pathname.slice(1).split("/")[0]}`
        : "");

    const unlisten = history.listen(() => {
      document.title =
        "Foodie" +
        (location.pathname.slice(1)
          ? ` - ${location.pathname.slice(1).split("/")[0]}`
          : "");
    });

    return unlisten;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setTimeout(() => {
        const scrollBtn = document.querySelector(".scroll-top");

        if (window.scrollY > 100) {
          scrollBtn.style.display = "flex";
        } else {
          scrollBtn.style.display = "none";
        }
      }, 1000);
    });
  }, []);

  return (
    <>
      <OnBoarding />

      <Navbar />

      <Box minHeight="100vh">
        <Switch>
          <Route path="/" exact>
            <Index />
          </Route>

          <Route path="/Bookmarks">
            <Bookmarks />
          </Route>

          <Route path="/Favourites">
            <Favourites />
          </Route>

          <Route path="/Restaurant">
            <Restaurant />
          </Route>

          <Route path="/Cookie-Policy">
            <CookiePolicy />
          </Route>

          <Route path="/TOS">
            <TOS />
          </Route>

          <Route path="/Privacy-Policy">
            <PrivacyPolicy />
          </Route>

          <Route path="/Register">
            <Register />
          </Route>

          <Route path="/Profile">
            <Profile />
          </Route>

          <Route path="/Edit-Profile">
            <EditProfile />
          </Route>

          <Route path="/Reset-Password">
            <ResetPassword />
          </Route>
        </Switch>
      </Box>

      <Footer />

      <CookieConsent
        buttonText=" Accept"
        buttonStyle={{ backgroundColor: "var(--chakra-colors-brand-100)" }}
      >
        Cookies are used to enhance your experience, by using this service you
        consent to the use of cookies.
        <Link
          href="/Cookie-Policy"
          color="var(--chakra-colors-brand-100)"
          ml="0.5rem"
        >
          Learn more
        </Link>
      </CookieConsent>

      <Tooltip
        label="Scroll to top"
        aria-label="Scroll to top"
        placement="left"
      >
        <IconButton
          className="scroll-top"
          variant="ghost"
          position="fixed"
          bottom="1rem"
          right="1rem"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          display="none"
          zIndex="100"
          icon={<HiArrowUp size="22px" />}
        />
      </Tooltip>
    </>
  );
}

export default App;
