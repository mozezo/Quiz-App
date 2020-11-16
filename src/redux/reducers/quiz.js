import { 
    SAVE_LANG,
    UPDATE_CURRENT_TYPE,
    UPDATE_CURRENT_Question,
    UPDATE_Answered_Questions,
    UPDATE_Answered_AGE_Questions
} from '../constants';
import Quizs from '../../data/Quiz_types.json';
import QuizsAr from '../../data/Quiz_types_ar.json';
import { get } from 'lodash';

const initialState = {
    lang: 'ar',
    currentType: Quizs.sourceType[0],
    quizsTypes: Quizs.sourceType,
    quizsTypesAr: QuizsAr.sourceType,
    quizQuestions: Quizs.questions,
    quizQuestionsAr: QuizsAr.questions,
    currentQuestion: Quizs.questions[0],
    answeredQuestions: []
};

const QuizReducer = (state = initialState , action) => {

    switch(action.type){
        case SAVE_LANG:
            return{...state, lang: action.payload.lang}
        case UPDATE_CURRENT_TYPE:
            const QuizTypes = state.lang === 'en' ? get(state, 'quizsTypes', []) : get(state, 'quizsTypesAr', []);
            return {...state , currentType: QuizTypes[action.payload.index]  };
        case UPDATE_CURRENT_Question:
            const QuizQuestions = state.lang === 'en' ? get(state, 'quizQuestions', []) : get(state, 'quizQuestionsAr', []);
            let filteredQuestions =  QuizQuestions.filter((item) => {
                return item.typeId === get(state, 'currentType.id', 1)
            })
            return {...state , currentQuestion: filteredQuestions[action.payload.index] };
        case UPDATE_Answered_Questions:
            let newAnsweredQuestions = state.answeredQuestions;
            let questionIndex = newAnsweredQuestions.findIndex((item) => item.id === action.payload.answeredQuestion.id && item.typeId === action.payload.answeredQuestion.typeId);
            if(questionIndex === -1){
                return {...state, answeredQuestions: [...newAnsweredQuestions, action.payload.answeredQuestion]};
            }else{
                newAnsweredQuestions[questionIndex] = action.payload.answeredQuestion
                return {...state, answeredQuestions: newAnsweredQuestions};
            }
        case UPDATE_Answered_AGE_Questions:
            let newansweredQuestions = state.answeredQuestions;
            let questionAgeIndex = newansweredQuestions.findIndex((item) => item.id === action.payload.answeredQuestion.id && item.typeId === action.payload.answeredQuestion.typeId);
            if(questionAgeIndex === -1){
                return {...state, answeredQuestions: [...newansweredQuestions, action.payload.answeredQuestion]};
            }else{
                newansweredQuestions[questionAgeIndex] = action.payload.answeredQuestion
                return {...state, answeredQuestions: newansweredQuestions};
            }
            default:
            return state;
    }
}

export default QuizReducer;