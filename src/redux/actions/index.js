import { 
    UPDATE_CURRENT_TYPE,
    UPDATE_CURRENT_Question,
    UPDATE_Answered_Questions,
    UPDATE_Answered_AGE_Questions
} from '../constants/index';



const updateCurrentType = index => {
    return{
        type: UPDATE_CURRENT_TYPE,
        payload: {index}
    }
}

const updateCurrentQuestion = index => {
    return{
        type: UPDATE_CURRENT_Question,
        payload: {index}
    }
}

const updateAnsweredQuestions = (question, answer) => {
    const answeredQuestion = {...question, answer : answer}
    return{
        type: UPDATE_Answered_Questions,
        payload: { answeredQuestion }
    }
}

const updateAnsweredAgeQuestions = (question, answer) => {
    const answeredQuestion = {...question, answer : answer}
    return{
        type: UPDATE_Answered_AGE_Questions,
        payload: { answeredQuestion }
    }
}




export { updateCurrentType, updateCurrentQuestion, updateAnsweredQuestions, updateAnsweredAgeQuestions };