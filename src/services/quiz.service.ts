import { Answer } from "../models/answer";
import { ListAnswer } from "../models/list-answer";
import { Quiz } from "../models/quiz";
import { QuizResponse } from "../models/quiz-response";
import { SecuredService } from "./abstract-secured.service";
import { ApiResultPromise } from "./api.result";


export class QuizService extends SecuredService {
    private readonly baseUrl = this.rootUrl + 'quiz';

    public getQuiz(): ApiResultPromise<Quiz>{
        return this.get(this.baseUrl);
    }

    public getQuizCustom(): Promise<Quiz>{
        return this.getCustom(this.baseUrl);
    }
    
    public submitQuiz(answers: Answer[]): ApiResultPromise<QuizResponse>{
        return this.post(`${this.baseUrl}/answer`, answers);
    }

    public submitQuizCustom(listAnswer: ListAnswer): Promise<QuizResponse>{
        return this.postCustom(`${this.baseUrl}/answer`, listAnswer);
    }
}