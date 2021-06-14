import { Answer } from "../models/answer";
import { Quiz } from "../models/quiz";
import { QuizResponse } from "../models/quiz-response";
import { SecuredService } from "./abstract-secured.service";
import { ApiResultPromise } from "./api.result";


export class FlexNapBuildService extends SecuredService {
    private readonly baseUrl = this.rootUrl + 'quiz';

    public getQuiz(): ApiResultPromise<Quiz>{
        return this.get(this.baseUrl);
    }
    
    public submitQuiz(listAnswer: Answer[]): ApiResultPromise<QuizResponse>{
        return this.post(this.baseUrl, listAnswer);
    }
}