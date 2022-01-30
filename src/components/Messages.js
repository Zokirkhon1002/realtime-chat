import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  ownerMessage: {
    backgroundColor: "#1976d2",
    color: "white",
  },
  userMessage: {
    backgroundColor: "#c1c1c1",
    color: "white",
  },
});

const pad = (val) => {
  return val < 10 ? "0" + val : val;
};

const secondsToMilliseconds = (timestamp) => {
  let stamp = timestamp.toString();
  stamp = stamp.length < 13 ? stamp.padEnd(13, 0) : stamp;
  return +stamp;
};

const timestampToTime = (timestamp) => {
  timestamp = secondsToMilliseconds(timestamp);

  const hours = new Date(timestamp).getHours();
  const minutes = new Date(timestamp).getMinutes();

  return pad(hours) + ":" + pad(minutes);
};

const Messages = ({ messages, currentUser }) => {
  const classes = useStyles();
  return (
    <List>
      {messages?.map((message) => (
        <ListItem
        key={uuidv4()}
          style={{ borderRadius: "10px", margin: "10px 0px" }}
          alignItems="flex-start"
          className={
            message.uid === currentUser
              ? classes.ownerMessage
              : classes.userMessage
          }
        >
          <ListItemAvatar>
            <a href={message.photoURL} target="react/jsx-no-target-blank" download>
              <Avatar
                alt={message.displayName}
                src={message.photoURL}
                title={message.displayName}
              />
            </a>
          </ListItemAvatar>
          <ListItemText
            primary={message.displayName}
            secondary={<Typography component="span">{message.text}</Typography>}
            color="inherit"
          />
          <ListItemSecondaryAction>
            <Typography component="span" style={{ color: "white" }}>
              {message?.createdAt?.seconds
                ? timestampToTime(message?.createdAt?.seconds)
                : timestampToTime(Date.now())}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default Messages;
