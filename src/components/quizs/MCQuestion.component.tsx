import React, { FC, ReactElement, useEffect } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MCQ } from "../../models/multiple-choice-question";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            textTransform: "uppercase",
        },
        root: {
            width: '100%',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            left: 'calc(-50% + 50px)',
            right: 'calc(50% + 50px)',
        },
        alternativeLabela: {
            top: 10,
            left: 'calc(-50% + 160px)',
            right: 'calc(50% + 160px)',
            marginLeft: theme.spacing(30),
            marginRight: theme.spacing(30),
        },
        questionClass: {
            marginLeft: theme.spacing(5),
        }
    })
);

// define interface to represent component props
interface Props {
    question?: MCQ;
    defaultValue: string;
    isReadonly: boolean;
    handleChange: (event) => void;
}

const MCQuestion: FC<Props> = ({ question, defaultValue, isReadonly, handleChange }): ReactElement => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const onChange = (event) => {
        if (isReadonly) return;
        setValue(event.target.value);
        handleChange(event);
    }

    return (
        !question || !question.question ? (
            <div>Cannot Load question content!</div>
        ) : (
            <Typography className={classes.instructions} component="div">
                <FormControl component="fieldset" className={classes.questionClass}>
                    <RadioGroup aria-label="mcq" name="mcq" value={value} onChange={onChange}>
                        {question.choices.A ? (<FormControlLabel value="A" disabled={!question.choices.A} control={<Radio />} label={question.choices.A} />) : null}
                        {question.choices.B ? (<FormControlLabel value="B" disabled={!question.choices.B} control={<Radio />} label={question.choices.B} />) : null}
                        {question.choices.C ? (<FormControlLabel value="C" disabled={!question.choices.C} control={<Radio />} label={question.choices.C} />) : null}
                        {question.choices.D ? (<FormControlLabel value="D" disabled={!question.choices.D} control={<Radio />} label={question.choices.D} />) : null}
                    </RadioGroup>
                </FormControl>
            </Typography>
        )
    );
};

export default MCQuestion;