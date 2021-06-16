import React, { FC, ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "../../config";
import RouteItem from "../../models/RouteItem.model";
import Layout from "../layouts/Layout";
import Page404 from "../../views/Page404";
import Home from "../../pages/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textTransform: "uppercase",
    },
    root: {
      textTransform: "uppercase",
    },
  })
);

// define interface to represent component props
interface Props {
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const ConfigRouters: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <Switch>
      {routes.map((route: RouteItem) => (
        route.subRoutes ? route.subRoutes.map((item: RouteItem) => (
          <Route
            key={`${item.key}`}
            path={`${item.path}`}
            component={item.component || Page404}
            exact
          />
        )) :
          <Route
            key={`${route.key}`}
            path={`${route.path}`}
            component={route.component || Page404}
            exact
          />
      ))}
    </Switch>
  );
};

export default ConfigRouters;