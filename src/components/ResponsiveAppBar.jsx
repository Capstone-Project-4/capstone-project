import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";
import getAllUrls from "./urlData";
import { retrieveUser } from "./auth";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar({ isLoggedIn, email, setLoginToFalse }) {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    setLoginToFalse();
    navigate("/"); // Redirect after logout
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() =>
              navigate(
                isLoggedIn ? getAllUrls(retrieveUser().roleId).dashboard : "/"
              )
            }
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            FundMate
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() =>
              navigate(
                isLoggedIn ? getAllUrls(retrieveUser().roleId).dashboard : "/"
              )
            }
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={email}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={email} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => console.log("Profile Clicked")}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ paddingRight: "10px" }}
                    >
                      account_circle
                    </span>{" "}
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ color: "red" }} onClick={() => handleLogout()}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ paddingRight: "10px" }}
                    >
                      logout
                    </span>{" "}
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!isLoggedIn && (
            <>
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => navigate("/Login")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/Signup")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Signup
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <span className="material-symbols-outlined">menu</span>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/Login");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ paddingRight: "10px" }}
                      >
                        login
                      </span>
                      Login
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/Signup");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ paddingRight: "10px" }}
                      >
                        add_circle
                      </span>
                      SignUp
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
