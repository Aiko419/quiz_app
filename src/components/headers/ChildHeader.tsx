import React, { FC, ReactElement } from "react";
import clsx from "clsx";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link, Router, Switch, Route } from "react-router-dom";

// app routes
import { routes } from "../../config/childmenu";
// interfaces
import RouteItem from "../../models/RouteItem.model";

// define css-in-js
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
const ChildHeader = () =>  {
    const classes = useStyles();


    const loggedInUser = localStorage.getItem("token");

    console.log("loggedInUser : " + loggedInUser);
  
    const handleNavigate = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
        //localStorage.setItem("token", "admin");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("loggedInUser : " + loggedInUser);
    };
  
    return (
      <>
                {!loggedInUser ? (
                  <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                  key="login"
                  onClick={handleNavigate}
                  c={classes.link}>
                    Login
                  </Link>
                ):(
                <Link 
                to="/logout"
                style={{ textDecoration: "none", color: "inherit" }}
                key="logout"
                onClick={handleLogout}
                c={classes.link}>
                LogOut
                </Link>
              )}
      </>
      
    );
  };
  
  export default ChildHeader;