import React, { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// components
import PageTitle from "../components/page-titles/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";

//import image
import QuizImage from '../image/quiz.png';
import Grid from "@material-ui/core/Grid";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    image: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();


  return (
    <>

      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '80vh' }}
      >
        <img src={QuizImage} alt="error-page-found" />
      </Grid>
    </>
  );
};

export default Home;