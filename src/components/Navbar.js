import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";

import firebase from "firebase";

function Navbar() {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(user);
  };
  const [user] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#1976d2"}}>
        <Toolbar variant="dense">
          <h3>Kotibkhonov Zokirkhon Zokhidkhon Ugli</h3>
          <Grid container justifyContent={"flex-end"}></Grid>
          {user ? (
            <Button onClick={() => auth.signOut()} color="inherit">
              Chiqish
            </Button>
          ) : (
            <NavLink style={{ textDecoration: "none" }} to={LOGIN_ROUTE}>
              <Button onClick={login} style={{ color: "#fff" }} color="inherit">
                Kirish
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
