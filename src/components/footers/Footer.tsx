import React, { ReactElement, FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { FOOTER_TEXT } from "../../utils/constants";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const Footer: FC<any> = (): ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {FOOTER_TEXT}
        </div>
    );
};

export default Footer;