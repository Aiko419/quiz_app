import React, { useReducer } from "react";
import { Helmet } from "react-helmet";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  createMuiTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import reducers from "./redux/reducers";

// components
import Routors from "./components/routers/Routers";

// theme
import { lightTheme, darkTheme } from "./theme/appTheme";

// app routes
import { routes } from "./config";

// constants
import { APP_TITLE } from "./utils/constants";

// define app context
const AppContext = React.createContext(null);

export const store = configureStore({
  reducer: reducers,
});

function App() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);
  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <Provider store={store}>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <Routors routes={routes} toggleTheme={toggle} useDefaultTheme={useDefaultTheme} />
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;

