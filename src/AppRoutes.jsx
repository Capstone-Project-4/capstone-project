import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import UserDashboard from "./components/UserPages/UserDashboard";
import AdminDashboard from "./components/AdminPages/AdminDashboard";
import CommunityHeadDashboard from "./components/CommunityHeadPages/CommunityHeadDashboard";
import ComponentNotFound from "./components/ComponentNotFound";
import { retrieveUser } from "./components/auth";
import getAllUrls from "./components/urlData";
import CreateCommunity from "./components/CommunityHeadPages/CreateCommunity";
import CreateRules from "./components/CommunityHeadPages/CreateRules";
import CommunityJoin from "./components/UserPages/CommunityJoin";
import CommunityView from "./components/UserPages/CommunityView";
import MakeRequest from "./components/UserPages/MakeRequest";
import MakeContribution from "./components/UserPages/MakeContribution";

const AppRoutes = ({ setLoginToTrue, handleOpenSnackbar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/" &&
      location.pathname !== "/Login" &&
      location.pathname !== "/Signup" &&
      retrieveUser() === null
    ) {
      handleOpenSnackbar("Sorry, You are Logged Out.");
      navigate("/");
    } else if (retrieveUser() !== null) {
      if (
        location.pathname === "/" ||
        location.pathname === "/Login" ||
        location.pathname === "/Signup"
      ) {
        handleOpenSnackbar("You are already Signed In.");
        navigate(getAllUrls(retrieveUser().roleId).dashboard);
      } else if (
        !location.pathname.startsWith(
          "/" + getAllUrls(retrieveUser().roleId).roleName
        )
      ) {
        handleOpenSnackbar("Invalid URL");
        navigate(getAllUrls(retrieveUser().roleId).dashboard);
      }
    }
  }, [navigate, location.pathname]); // Added location.pathname as a dependency

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/Login"
        element={
          <LoginPage
            handleOpenSnackbar={handleOpenSnackbar}
            setLoginToTrue={setLoginToTrue}
          />
        }
      />
      <Route
        path="/Signup"
        element={<SignUpPage handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/User/Dashboard"
        element={<UserDashboard handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/User/CommunityJoin"
        element={<CommunityJoin handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/User/CommunityView"
        element={<CommunityView handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/User/MakeRequest"
        element={<MakeRequest handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/User/MakeContribution"
        element={<MakeContribution handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
      <Route
        path="/CommunityHead/Dashboard"
        element={
          <CommunityHeadDashboard handleOpenSnackbar={handleOpenSnackbar} />
        }
      />
      <Route
        path="/CommunityHead/CreateCommunity"
        element={<CreateCommunity handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route
        path="/CommunityHead/CreateRules"
        element={<CreateRules handleOpenSnackbar={handleOpenSnackbar} />}
      />
      <Route path="*" element={<ComponentNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
