import React, { FC, ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteItem from "../../models/RouteItem.model";
import Layout from "../layouts/Layout";
import Page404 from "../../views/Page404";
import Home from "../../pages/Home";
import ConfigRouters from "./ConfigRouters";

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
  routes: RouteItem[];
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const Routors: FC<Props> = ({routes, toggleTheme, useDefaultTheme }): ReactElement => {
  const classes = useStyles();
  return (
    <Router>
            <Switch>
              {routes.map((route: RouteItem) => (
                route.subRoutes ? route.subRoutes.map((item: RouteItem) => (
                  <Route
                    key={`${item.key}`}
                    path={`${item.path}`}
                    component={item.component || Page404}
                    exact
                  >
                    <Layout toggleTheme={toggleTheme} useDefaultTheme={useDefaultTheme}>
                      <ConfigRouters />
                    </Layout>
                  </Route>

                )) :
                  <Route
                    key={`${route.key}`}
                    path={`${route.path}`}
                    component={route.component || Page404}
                  >
                    <Layout toggleTheme={toggleTheme} useDefaultTheme={useDefaultTheme}>
                        <ConfigRouters />
                    </Layout>
                  </Route>
              ))}
              <Layout toggleTheme={toggleTheme} useDefaultTheme={useDefaultTheme}>
                <Switch>
                  <Route path="/" component={Home} exact></Route>
                  <Route path="*" component={Page404} exact></Route>
                </Switch>
              </Layout>
            </Switch>
          </Router>
  );
};

export default Routors;