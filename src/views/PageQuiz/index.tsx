import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { makeStyles} from "@material-ui/core/styles";
import { loadMCQs } from '../../redux/quiz.state';
import { MCQsSelector } from '../../selectors/root.selectors';
import QuizCom from '../../components/quizs/Quiz.component';

// define css-in-js
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const QuizApp: FC<{}> = (): ReactElement => {

    const loggedInUser = localStorage.getItem("token");
    

    const dispatch = useDispatch();
    useEffect(() => {
        loadMCQs()(dispatch);
    }, []);

    const handleComplete = () => {

    }

    const mcqs = useSelector(MCQsSelector);

    if (!loggedInUser) {
        return (<Redirect to='/' />)
    };
    return (
        <QuizCom MCQs={mcqs} handleComplete={handleComplete} />
    )
}

export default QuizApp;