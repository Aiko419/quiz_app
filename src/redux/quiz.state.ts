import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Answer } from "../models/answer";
import { ListAnswer } from '../models/list-answer';
import { MCQ } from '../models/multiple-choice-question';
import { Quiz } from "../models/quiz";
import { QuizResponse } from "../models/quiz-response";
import { QuizService } from '../services/quiz.service';
import { createSecuredAsyncAction } from './action';
import { apiError } from './error.state';

export interface QuizState {
    MCQs: MCQ[];
    answers: Answer[];
    quizResponse?: QuizResponse;
}

const initialState: QuizState = {
    MCQs: [],
    answers: [],
    quizResponse: undefined,
}

function loadMCQsReducer(state: QuizState, action: PayloadAction<MCQ[]>) {
    state.MCQs = action.payload;
}

function loadQuizResponseReducer(state: QuizState, action: PayloadAction<QuizResponse>){
    state.quizResponse = action.payload;
}

function clearQuizResponseReducer(state: QuizState, _: PayloadAction<void>){
    state.quizResponse = undefined;
}

const { actions, reducer } = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        loadMCQs: loadMCQsReducer,
        loadQuizResponse: loadQuizResponseReducer,
        clearQuizResponse: clearQuizResponseReducer,
    },
});

export const {
    loadQuizResponse, clearQuizResponse
} = actions;

export { reducer as QuizReducer };

export const loadMCQs = () => {
    return createSecuredAsyncAction(async (dispatch) => {
        const service = new QuizService();
        const res = await service.getQuizCustom();
        if (res?.result) {
            dispatch(actions.loadMCQs(res.result));
        }
        else {
            //dispatch(apiError(res));
        }
    });
}

export const submitQuiz = (listAnswer: ListAnswer) => {
    return createSecuredAsyncAction(async (dispatch) => {
        const service = new QuizService();
        const res = await service.submitQuizCustom(listAnswer);
        debugger;
        if (res) {
            dispatch(actions.loadQuizResponse(res));
        }
        else {
            //dispatch(apiError(res));
        }
    });
}


