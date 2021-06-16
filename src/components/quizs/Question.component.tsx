import React, { FC, ReactElement, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from "@material-ui/core";
import { MCQ } from "../../models/multiple-choice-question";
import { Answer } from "../../models/answer";
import { store } from "../../App";
import { submitQuiz } from "../../redux/quiz.state";
import { QuizResponse } from "../../models/quiz-response";
import { useSelector } from "react-redux";
import { quizResponseSelector } from "../../selectors/root.selectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textTransform: "uppercase",
    },
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    alternativeLabela: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    }
  })
);

// define interface to represent component props
interface Props {
    question: MCQ;
    defaultValue: string;
    handleChange: (event) => void;
}

const Question: FC<Props> = ({ question, defaultValue, handleChange}): ReactElement => {
    const classes = useStyles();

    return (
    <RadioGroup aria-label="mcq" name="mcq" value={defaultValue} onChange={handleChange}>
                    {!!question.choices.A ? (<FormControlLabel value="A" disabled={!question.choices.A} control={<Radio />} label={question.choices.A} />) : null}
                    {!!question.choices.B ? (<FormControlLabel value="B" disabled={!question.choices.B} control={<Radio />} label={question.choices.B} />) : null}
                    {!!question.choices.C ? (<FormControlLabel value="C" disabled={!question.choices.C} control={<Radio />} label={question.choices.C} />) : null}
                    {!!question.choices.D ? (<FormControlLabel value="D" disabled={!question.choices.D} control={<Radio />} label={question.choices.D} />) : null}
                </RadioGroup>
    );
};

export default Question;