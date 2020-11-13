import { 
    UPDATE_CURRENT_TYPE,
    UPDATE_CURRENT_Question,
    UPDATE_Answered_Questions,
    UPDATE_Answered_AGE_Questions
} from '../constants';
import Quizs from '../../data/Quiz_types.json';

const initialState = {
    currentType: Quizs.sourceType[0],
    quizsTypes: Quizs.sourceType,
    quizQuestions: Quizs.questions,
    currentQuestion: Quizs.questions[0],
    answeredQuestions: []
};

const QuizReducer = (state = initialState , action) => {

    switch(action.type){
        case UPDATE_CURRENT_TYPE:
            return {...state , currentType: state.quizsTypes[action.payload.index] };
        case UPDATE_CURRENT_Question:
            let filteredQuestions =  state.quizQuestions.filter((item) => {
                return item.typeId === state.currentType.id
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
            // let newAnsweredQuestions = state.answeredQuestions;
            // let questionIndex = newAnsweredQuestions.findIndex((item) => item.id === action.payload.answeredQuestion.id && item.typeId === action.payload.answeredQuestion.typeId);
            // if(questionIndex === -1){
            //     return {...state, answeredQuestions: [...newAnsweredQuestions, action.payload.answeredQuestion]};
            // }else{
            //     newAnsweredQuestions[questionIndex] = action.payload.answeredQuestion
            //     return {...state, answeredQuestions: newAnsweredQuestions};
            // }
            default:
            return state;
    }
}

export default QuizReducer;