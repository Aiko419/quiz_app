import { StateModel } from "../redux/reducers";

export const MCQsSelector = (state: StateModel) => state.quiz.MCQs;
export const answersSelector = (state: StateModel) => state.quiz.answers;
export const quizResponseSelector = (state: StateModel) => state.quiz.quizResponse;
export const quizResponseStatusSelector = (state: StateModel) => state.quiz.quizResponse?.status;
export const inccorrectAnswersSelector = (state: StateModel) => state.quiz.quizResponse?.incorrectAnswers;

export const selectedMCQIdSelector = (state: StateModel) => state.selection.selectedMCQId;