import { MCQ } from "./multiple-choice-question";

export interface QuizResponse {
    status: string;
    incorrectAnswers: MCQ[];
}