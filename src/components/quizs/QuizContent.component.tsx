import React, { FC, ReactElement, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Paper, Step, StepButton, Stepper, Typography } from "@material-ui/core";
import { MCQ } from "../../models/multiple-choice-question";
import { Answer } from "../../models/answer";
import { store } from "../../App";
import { submitQuiz } from "../../redux/quiz.state";
import MCQuestion from "./MCQuestion.component";
import QuizReview from "./QuizReview.component";

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
}

const QuizContent: FC<Props> = ({ questions }): ReactElement => {
    const classes = useStyles();
    const [index, setIndex] = useState(-1);
    const [review, setReview] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<MCQ | undefined>(undefined);
    const [completedAnswers, setCompletedAnswers] = useState<Answer[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState('');

    useEffect(() => {
        if (totalQuestions() > 0 && (index < 0 || index > totalQuestions() - 1)) {
            setIndex(0);
        }
        setCurrentQuestion(questions[index]);
    }, [questions, index]);

    useEffect(() => {
        const completedAnswer = getCompletedAnswer(currentQuestion?.id);
        setCurrentAnswer(completedAnswer?.choice || '');
    }, [currentQuestion]);

    useEffect(() => {
        if (!currentQuestion || !currentAnswer) return;
        const completedAnswer = getCompletedAnswer(currentQuestion?.id);
        if (completedAnswer) {
            setCompletedAnswers([...completedAnswers.filter((answer) => answer.id !== currentQuestion.id), { id: currentQuestion.id, choice: currentAnswer, }]);
        } else {
            setCompletedAnswers([...completedAnswers, { id: currentQuestion.id, choice: currentAnswer, }]);
        }
    }, [currentAnswer]);

    const totalQuestions = () => {
        return questions.length;
    };

    const isFirstQuestion = () => {
        return index <= 0;
    };

    const isLastQuestion = () => {
        return index >= totalQuestions() - 1;
    };

    const getCompletedAnswer = (questionId) => {
        return completedAnswers.find((answer) => answer.id === questionId);
    }

    const handleSubmit = () => {
        const list = {
            listAnswer: completedAnswers
        };
        submitQuiz(list)(store.dispatch);
    }

    const handleChange = (event) => {
        setCurrentAnswer(event.target.value);
    };

    const handleBack = () => {
        setIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        const newActiveStep = isLastQuestion() ? index : index + 1;
        setIndex(newActiveStep);
    };

    const handleReview = () => {
        setReview((r) => !r);
    }

    const handleReviewBack = () => {
        setReview(false);
    }

    const completedSteps = () => {
        return completedAnswers.length;
    }

    function isStepComplete(step: number) {
        const q = questions[step];
        return !!getCompletedAnswer(q.id);
    }

    const handleStep = (step: number) => () => {
        setIndex(step);
    };
    return (
        <>
            {review ? (
                <QuizReview questions={questions} answers={completedAnswers} handleBack={handleReviewBack} handleSubmit={handleSubmit} />
            ) : (
                <>
                    <Stepper alternativeLabel nonLinear activeStep={index}>
                        {questions.map((q, i) => {
                            const stepProps: { completed?: boolean } = {};
                            const buttonProps: { optional?: React.ReactNode } = {};
                            return (
                                <Step key={q.id} {...stepProps}>
                                    <StepButton
                                        onClick={handleStep(i)}
                                        completed={isStepComplete(i)}
                                        {...buttonProps}
                                    >
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <Paper elevation={4} className={classes.alternativeLabela}>

                        <Typography variant="h4" className={classes.title} color="textSecondary">
                            <span> Question # {index + 1}/{totalQuestions()}</span>
                        </Typography>
                        <hr style={{ marginBottom: "20px" }} />
                        <Typography variant="h4">
                            {index + 1}: {currentQuestion?.question}
                        </Typography>
                        <Typography className={classes.instructions} component="div">
                            <MCQuestion question={currentQuestion} defaultValue={currentAnswer} isReadonly={false} handleChange={handleChange}></MCQuestion>
                        </Typography>
                        <Button disabled={isFirstQuestion()} onClick={handleBack} className={classes.button}>Back</Button>
                        <Button disabled={isLastQuestion()} variant="contained" color="primary" onClick={handleNext} className={classes.button}>Next</Button>
                        <Button disabled={completedSteps() !== totalQuestions()} variant="contained" color="primary" onClick={handleReview} className={classes.button}>Review</Button>
                        <Button disabled={completedSteps() !== totalQuestions()} variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>Submit</Button>
                    </Paper>
                </>
            )}
        </>
    );
};

export default QuizContent;