import { FC, ReactElement, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Paper, Typography } from "@material-ui/core";
import { MCQ } from "../../models/multiple-choice-question";
import { Answer } from "../../models/answer";
import { store } from "../../App";
import { clearQuizResponse, submitQuiz } from "../../redux/quiz.state";
import { useSelector } from "react-redux";
import { quizResponseSelector } from "../../selectors/root.selectors";
import QuizContent from "./QuizContent.component";

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

const QuizCom: FC<{ MCQs: MCQ[], handleComplete: () => void }> = ({ MCQs, handleComplete }): ReactElement => {
    const classes = useStyles();
    const [answers, setAnswers] = useState<Answer[]>([]);
    const response = useSelector(quizResponseSelector);
    const isSubmited = () => {
        return !!response;
    }

    const handleBack = () => {
        store.dispatch(clearQuizResponse());
    }

    return (
        <>
            { isSubmited() ? (
                <>
                    <Paper elevation={4} className={classes.alternativeLabela}>

                        <Typography variant="h4" className={classes.title} color="textSecondary">
                            <span> Your quiz status: {response?.status}</span>
                        </Typography>
                        <hr style={{ marginBottom: "20px" }} />
                        <Typography variant="h5" className={classes.instructions}>
                            Your scored {(MCQs?.length || 0) - (response?.incorrectAnswers?.length || 0)} out of {MCQs?.length}
                        </Typography>
                        <Button onClick={handleBack} className={classes.button}>Reset</Button>
                    </Paper>
                </>
            ) : (
                <>
                    <QuizContent questions={MCQs} />
                </>
            )}
        </>
    );
};

export default QuizCom;