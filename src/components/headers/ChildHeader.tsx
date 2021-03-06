import React, { FC, ReactElement } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      transition: "box-shadow",
      transitionDuration: "1s",
      boxShadow: `0 0 3px ${theme.palette.primary.main}, 0 0 9px ${theme.palette.primary.main}, 0 0 11px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}`
    },
    nested: {
      marginLeft: theme.spacing(2),
    },
    listItemDisabled: {
      cursor: "not-allowed",
      marginLeft: theme.spacing(2),
    },
    link: {
      marginLeft: theme.spacing(2),
    },
  })
);
// functional component
const ChildHeader = () => {
  const classes = useStyles();

  let loggedInUser = localStorage.getItem("token");

  console.log("loggedInUser : " + loggedInUser);

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    //localStorage.setItem("token", "admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    loggedInUser = null;
    console.log("loggedInUser : " + loggedInUser);
  };

  return (
    <>
      <Link
        to="/quizapp"
        style={{ textDecoration: "none", color: "inherit" }}
        key="quizapp"
        className={classes.link}
          >
        Quiz         
          </Link>

      {!loggedInUser ? (
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "inherit" }}
          key="login"
          onClick={handleNavigate}
          className={classes.link}>
          Login
        </Link>
      ) : (
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          key="logout"
          onClick={handleLogout}
          className={classes.link}>
          LogOut
        </Link>
      )}
    </>
  );
};

export default ChildHeader;
