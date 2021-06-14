import { combineReducers } from 'redux';
import { QuizReducer } from './quiz.state';
import { SelectionReducer } from './selection.state';

const rootReducer = combineReducers({
    selection: SelectionReducer,
    //authentication: AuthenticationReducer,
    quiz: QuizReducer,
});

export default rootReducer;
export type StateModel = ReturnType<typeof rootReducer>;