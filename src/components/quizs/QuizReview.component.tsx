import React, { FC, ReactElement, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Step, StepButton, StepConnector, Stepper, Typography } from "@material-ui/core";
import { MCQ } from "../../models/multiple-choice-question";
import { Answer } from "../../models/answer";
import { store } from "../../App";
import { submitQuiz } from "../../redux/quiz.state";
import { QuizResponse } from "../../models/quiz-response";
import { useSelector } from "react-redux";
import { quizResponseSelector } from "../../selectors/root.selectors";
import MCQuestion from "./MCQuestion.component";

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
            left: 'calc(-50% + 160px)',
            right: 'calc(50% + 160px)',
            marginLeft: theme.spacing(30),
            marginRight: theme.spacing(30),
        }
    })
);


// define interface to represent component props
interface Props {
    questions: MCQ[];
    answers: Answer[];
    handleBack: () => void;
    handleSubmit: () => void;
}

const QuizReview: FC<Props> = ({ questions, answers, handleBack, handleSubmit }): ReactElement => {
    const classes = useStyles();
    const [currentQuestions, setCurrentQuestions] = useState<MCQ[]>([]);
    const [completedAnswers, setCompletedAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        setCurrentQuestions(questions);
    }, [questions]);

    useEffect(() => {
        setCompletedAnswers(answers);
    }, [answers]);

    const totalQuestions = () => {
        return questions.length;
    };

    const getCompletedAnswer = (questionId) => {
        return completedAnswers.find((answer) => answer.id === questionId)?.choice || '';
    }

    return (
        <>
            <Paper elevation={4} className={classes.alternativeLabela}>
                <Typography variant="h4" className={classes.title} color="textSecondary">
                    <span> Total Questions: {totalQuestions()}</span>
                </Typography>
                <hr style={{ marginBottom: "20px" }} />
                {totalQuestions() > 0 ? (
                    currentQuestions.map((q, i) => (
                        <>
                            <Typography variant="h4">
                            {i + 1}: {q?.question}
                            </Typography>
                            <Typography className={classes.instructions} component="div">
                                <MCQuestion question={q} defaultValue={getCompletedAnswer(q.id)} isReadonly={true} handleChange={handleBack}></MCQuestion>
                            </Typography>
                        </>
                    ))
                ): (
                    <Typography className={classes.instructions} component="div">Loading...</Typography>
                )}
                <Typography className={classes.instructions} component="div">
                <Button  onClick={handleBack} className={classes.button}>Back</Button>
                <Button  variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>Submit</Button>
                </Typography>
            </Paper>
        </>
    );
};

export default QuizReview;