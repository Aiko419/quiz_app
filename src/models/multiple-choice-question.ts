import { Choices } from "./choices";

//multible choice question
export interface MCQ {
    id: number;
    question: string;
    choices: Choices;
}