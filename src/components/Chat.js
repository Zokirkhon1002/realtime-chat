import React, { useContext, useRef, useState } from "react";
import { Context } from "../index";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import Messages from "./Messages";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  grid: {
    height: window.innerHeight - 64,
  },
  viewBox: {
    height: "60vh",
    width: "100%",
    border: "1px solid #1976d2",
    overflowY: "scroll",
    transition: 'all .3s',
    padding: "4px"
  },
  margin: {
    margin: "30px 10px 10px",
  },
  textField: {
    width: "100%",
  },
  white: {
    color: "#1976d2",
  },
  notchedOutline: {
    borderColor: "#3f51b5 !important",
  },
  button: {
    margin: "-4px",
  },
});

const Chat = () => {
  const classes = useStyles();

  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );
  // console.log(messages)
  // console.log(user);
  const chatBox = useRef(null);
  const sendMessage = () => {
    if (value.length) {
      firestore
        .collection("messages")
        .add({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          text: value,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setValue("");

          chatBox.current.scrollTo({
            top: chatBox.current.scrollHeight,
            behavior: "smooth",
          });
        });
    }
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.grid}
      >
        <Box ref={chatBox} className={classes.viewBox} bgcolor="inherit">
          <Messages key={uuidv4()} messages={messages} currentUser={user.uid} />
        </Box>
        <Box className={classes.margin} display="flex" width="100%">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <a
                href={user.photoURL}
                target="react/jsx-no-target-blank"
                download
              >
                <Avatar
                  alt={user.displayName}
                  src={user.photoURL}
                  title={user.displayName}
                />
              </a>
            </Grid>
            <Box flexGrow={1} pl={2} pr={3}>
              <TextField
                id="input-with-icon-grid"
                label="Send Message"
                rows={2}
                variant="outlined"
                value={value}
                className={classes.textField}
                InputProps={{
                  style: { color: "#1976d2", background: "transparent" },
                }}
                InputLabelProps={{
                  style: { color: "#000", background: "transparent" },
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                onChange={(e) => setValue(e.target.value)}
              />
            </Box>
          </Grid>
          <Button
            style={{ color: "white", backgroundColor: "#1976d2" }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={sendMessage}
          >
            <SendIcon />
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default Chat;
