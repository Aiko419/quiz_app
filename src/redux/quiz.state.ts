import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Answer } from "../models/answer";
import { MCQ } from '../models/multiple-choice-question';
import { Quiz } from "../models/quiz";
import { QuizResponse } from "../models/quiz-response";

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

function loadQuizReducer(state: QuizState, action: PayloadAction<Quiz>) {
    state.MCQs = action.payload?.result || [];
}

function loadQuizResponseReducer(state: QuizState, action: PayloadAction<QuizResponse>){
    state.quizResponse = action.payload;
}


const { actions, reducer } = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        loadQuiz: loadQuizReducer,
        loadQuizResponse: loadQuizResponseReducer,
    },
});

export const {
    loadQuizResponse
} = actions;

export { reducer as QuizReducer };

export const loadMCQs = (quiz: Quiz) => {
    actions.loadQuiz(quiz);
}