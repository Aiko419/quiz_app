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

const QuizCom: FC<{ MCQs: MCQ[], handleComplete: () => void }> = ({ MCQs, handleComplete }): ReactElement => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [mcq, setMcq] = React.useState(MCQs[0]);
    const [value, setValue] = React.useState('');
    const [answers, setAnswers] = React.useState<Answer[]>([]);
    const response = useSelector(quizResponseSelector);

    useEffect(() => {
        setMcq(MCQs[activeStep]);
    }, [MCQs, activeStep]);

    useEffect(() => {
        setValue(answers.find((awr) => awr.id === mcq.id)?.choice || '');
    }, [mcq]);

    useEffect(() =>{
        if(!mcq?.id || !value) return;
        if(!answers.find((awr) => awr.id === mcq?.id)){
            setAnswers([...answers, { id: mcq.id, choice: value,}]);
        } else {
            setAnswers([...answers.filter((awr) => awr.id !== mcq.id), { id: mcq.id, choice: value,}]);
        }
    }, [value]);

    const totalSteps = () => {
        return MCQs.length;
    };

    // const completedSteps = () => {
    //     return Object.keys(completed).length;
    // };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    // const allStepsCompleted = () => {
    //     return completedSteps() === totalSteps();
    // };

    const handleComplete2 = () => {
        const list = {
            listAnswer: answers
        };
        submitQuiz(list)(store.dispatch);
    }

    

    const handleChange = (event) => {
        setValue(event.target.value);
        
        if(!answers.find((awr) => awr.id === mcq.id)){
            setAnswers([...answers, { id: mcq.id, choice: event.target.value,}]);
        } else {
            setAnswers([...answers.filter((awr) => awr.id !== mcq.id), { id: mcq.id, choice: event.target.value,}]);
        }
    };
    const handleBack = (event) => {
        //const newActiveStep =
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        //setMcq(MCQs[activeStep]);
        //setValue(answers.find((awr) => awr.id === mcq.id)?.choice || '');
        //debugger;
    };

    const handleNext = (event) => {
        const newActiveStep =
            //isLastStep() && !allStepsCompleted()
            isLastStep()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                //steps.findIndex((step, i) => !(i in completed))
                activeStep
                : activeStep + 1;
        setActiveStep(newActiveStep);
        //setMcq(MCQs[activeStep]);
        //setValue(answers.find((awr) => awr.id === mcq.id)?.choice || '');
        //debugger;
    };

    const completedSteps = () => {
        return answers.length;
    }

    return (
        mcq ? (
        <Paper elevation={4} className={classes.alternativeLabela}>
            <Typography variant="h4" className={classes.title} color="textSecondary">
                <span> Question # {activeStep+1}/{MCQs.length} = incorrect {response?.incorrectAnswers?.length} /{response?.status}</span>
            </Typography>
            <hr style={{marginBottom: "20px"}}/>

            <Typography variant="h4">
            {activeStep+1}: {mcq.question}
            </Typography>
            <Typography className={classes.instructions} component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh' }}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="mcq" name="mcq" value={value} onChange={handleChange}>
                        {!!mcq.choices.A ? (<FormControlLabel value="A" disabled={!mcq.choices.A} control={<Radio />} label={mcq.choices.A} />) : null}
                        {!!mcq.choices.B ? (<FormControlLabel value="B" disabled={!mcq.choices.B} control={<Radio />} label={mcq.choices.B} />) : null}
                        {!!mcq.choices.C ? (<FormControlLabel value="C" disabled={!mcq.choices.C} control={<Radio />} label={mcq.choices.C} />) : null}
                        {!!mcq.choices.D ? (<FormControlLabel value="D" disabled={!mcq.choices.D} control={<Radio />} label={mcq.choices.D} />) : null}
                    </RadioGroup>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                        Next
            </Button>
            <Button variant="contained" color="primary" onClick={handleComplete2}>
                                            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                        </Button>
                </FormControl>
            </Typography>
            
        </Paper>
        
        ) : (
            <div>"Test"</div>
        )
    );
};

export default QuizCom;