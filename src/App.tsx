import React, { ReactElement, useReducer, FC } from "react";
import {
  createMuiTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// components
import Layout from "./components/layouts/Layout";

// theme
import { lightTheme, darkTheme } from "./theme/appTheme";

// app routes
import { routes } from "./config";

// constants
import { APP_TITLE } from "./utils/constants";

// interfaces
import RouteItem from "./models/RouteItem.model";

import Page404 from "./views/Page404";

import Page403 from "./views/Page403";

// define app context
const AppContext = React.createContext(null);

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);



function App() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <ThemeProvider theme={theme}>
            {/* for each route config, a react route is created */}
            <Router>
              <Switch>
              <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
              
                {routes.map((route: RouteItem) => (
                  route.subRoutes ? route.subRoutes.map((item: RouteItem) => (
                    <Route
                      key={`${item.key}`}
                      path={`${item.path}`}
                      component={item.component || DefaultComponent}
                      exact
                    />

                  )) :
                    <Route
                      key={`${route.key}`}
                      path={`${route.path}`}
                      component={route.component || DefaultComponent}
                      exact
                    />
                ))}
                </Layout>
                </Switch>
              </Router>  
            
                
                     
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
