import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 're-carousel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Male from '../../assets/images/male.png';
import Female from '../../assets/images/female.png';
import circle from '../../assets/images/circle.png';
import Quizs from '../../data/Quiz_types.json';
import QuizsAr from '../../data/Quiz_types_ar.json';
import { useSelector, useDispatch } from "react-redux";
import { get, isEmpty } from 'lodash';
import Buttons from './QuestionCustomButtons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { updateCurrentQuestion, updateAnsweredQuestions, updateAnsweredAgeQuestions } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
        color: '#00AF9A',
        border: ' 1px solid #00AF9A',
        alignSelf: 'flex-start',
        padding: '8px 36px',
        marginTop: '75px',
        transition: 'all 1s ease',
    },
    right: {
        margin: theme.spacing(1, 1, 0, 0),
        border: ' 1px solid #00AF9A',
        alignSelf: 'flex-start',
        padding: '8px 36px',
        background: '#00AF9A !important',
        color: '#FFF',
        marginTop: '75px',
        transition: 'all 1s ease'
    },
    add: {
        border: ' 1px solid #00AF9A',
        background: '#00AF9A !important',
        color: '#FFF',
        marginTop: '60px',
        marginLeft: '20px'
    }
}));

const GreenRadio = withStyles({
    root: {
        color: 'rgb(0, 175, 154)',
        '&$checked': {
            color: 'rgb(0, 175, 154)',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const Questions = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.quiz.lang);

    const currentType = useSelector((state) => state.quiz.currentType);
    const currentQuestion = useSelector((state) => state.quiz.currentQuestion);
    const currentAnsweredQuestions = useSelector((state) => state.quiz.answeredQuestions);

    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState({});
    const [questions, setQuestions] = useState([]);
    // const [currentAnswer, setCurrentAnswer] = useState(get(currentQuestion, `answers[${0}]`, []));
    const [currentAnswer, setCurrentAnswer] = useState(get(currentQuestionAnswer, `answer`, get(currentQuestion, `answers[${0}]`, [])));

    const [currentAgeAnswer, setCurrentAgeAnswer] = useState(get(currentQuestion, `answers`, []));
    const [errorMessage, setErrorMessage] = useState('');

    const [genderType, setGenderType] = useState('male');

    const handleGenderChange = (event, ageAnswer) => {
        //setGenderType(event.target.value);
        let newAgeAnswers = [...currentAgeAnswer];
        let currentAgeIndex = newAgeAnswers.findIndex((item) => item.id === ageAnswer.id);
        newAgeAnswers[currentAgeIndex].type = event.target.value;
        setCurrentAgeAnswer(newAgeAnswers);
    };

    const handleAgeChange = (event, newValue, ageAnswer) => {
        let newAgeAnswers = [...currentAgeAnswer];
        let currentAgeIndex = newAgeAnswers.findIndex((item) => item.id === ageAnswer.id);
        newAgeAnswers[currentAgeIndex].age = newValue;
        setCurrentAgeAnswer(newAgeAnswers);
    };

    const handleAddNewChild = () => {
        let newAgeAnswer = [...currentAgeAnswer, { id: currentAgeAnswer.length, type: '', age: '', img: `${currentAgeAnswer.length}children` }];
        setCurrentAgeAnswer(newAgeAnswer);
    }

    const handleAnswerChange = (event) => {
        setCurrentAnswer(JSON.parse(event.target.value));
        setErrorMessage('');
        //dispatch(updateAnsweredQuestions(currentQuestion, JSON.parse(event.target.value)))
    }

    useEffect(() => {
        let allQuestions = lang === 'en' ? Quizs : QuizsAr;
        let filteredQuestions = get(allQuestions, 'questions', []).filter((item) => {
            return item.typeId === get(currentType, 'id', 1)
        })
        setQuestions(filteredQuestions);
        const currentquestionIndex = filteredQuestions.findIndex((question) => question.id === get(currentQuestion, 'id', ''));
        if (currentquestionIndex === -1) {
            dispatch(updateCurrentQuestion(0));
        } else {
            dispatch(updateCurrentQuestion(currentquestionIndex));
        }
    }, []);


    useEffect(() => {
        const currentQuestionAnswerValue = currentAnsweredQuestions.find((item) => item.typeId === get(currentQuestion, 'typeId') && item.id === get(currentQuestion, 'id'));
        // console.log('currentQuestionAnswer', currentQuestionAnswerValue);
        // console.log('currentAnswer', currentAnswer);
        setCurrentQuestionAnswer(currentQuestionAnswerValue);
        setCurrentAnswer(get(currentQuestionAnswerValue, 'answer', get(currentQuestion, `answers[${0}]`, [])))
    }, [currentQuestion]);

    const handleNextClick = () => {
        const currentquestionIndex = questions.findIndex((question) => question.id === get(currentQuestion, 'id'));
        if (get(currentQuestion, 'answerType', '') === 'select') {
            if (get(currentAnswer, 'id') === 0) { //&& isEmpty(currentQuestionAnswer)
                setErrorMessage('Please answer this question!');
                return;
            }
            if (currentquestionIndex + 1 < questions.length) {
                dispatch(updateCurrentQuestion(currentquestionIndex + 1));
                dispatch(updateAnsweredQuestions(currentQuestion, currentAnswer))
                setCurrentAnswer(get(currentQuestion, `answers[${0}]`, []));
            } else {
                setErrorMessage('Please Save Your Answers!');
            }
        } else {
            if (currentquestionIndex + 1 < questions.length) {
                dispatch(updateCurrentQuestion(currentquestionIndex + 1));
                dispatch(updateAnsweredAgeQuestions(currentQuestion, currentAgeAnswer))
                //setCurrentAnswer(get(currentQuestion, `answers[${0}]`, []));
            }
        }
    }

    const handlePrevClick = () => {
        const currentquestionIndex = questions.findIndex((question) => question.id === get(currentQuestion, 'id'));
        //console.log('currentquestionIndex', currentquestionIndex);
        if (currentquestionIndex > 0) {
            dispatch(updateCurrentQuestion(currentquestionIndex - 1));
        }
    }

    const handleSaveClick = () => {
        const currentquestionIndex = questions.findIndex((question) => question.id === get(currentQuestion, 'id'));
        if (get(currentAnswer, 'id') === 0) {
            setErrorMessage('Please answer this question!');
            return;
        }

        //dispatch(updateCurrentQuestion(currentquestionIndex + 1));
        dispatch(updateAnsweredQuestions(currentQuestion, currentAnswer))
        history.push('/quizCompleted')
    }

    return (
        <TransitionGroup>
            <CSSTransition
                key={get(currentQuestion, 'id', '')}
                timeout={1000}
                classNames="slide"
            >
                <SurveyWrapper lang={lang}>
                    <SurveyMainWrapper>
                        <SurveyMainSection >
                            <h1>{get(currentType, 'name', '')}</h1>
                            <>
                                <FormLabel component="legend"><span style={{ color: '#00AF9A', marginRight: '10px', marginLeft: '10px', fontSize: '32px' }}>{get(currentQuestion, 'id', '')}</span>{get(currentQuestion, 'question', '')}</FormLabel>

                                {
                                    get(currentQuestion, `answerType`, '') === 'select' ? (

                                        <>
                                            <SelectStyled
                                                native
                                                value={JSON.stringify(currentAnswer)}
                                                //value={JSON.stringify(get(currentQuestionAnswer, 'answer', currentAnswer))}
                                                defaultValue={get(currentQuestion, `answers[${0}].answer`)}
                                                onChange={handleAnswerChange}
                                            >
                                                {
                                                    get(currentQuestion, 'answers', []).map((answerItem) => {
                                                        return (
                                                            <option value={JSON.stringify(answerItem)} style={{ color: '#00AF9A', fontSize: '18px', fontWeight: '700', marginTop: '10px' }}>{answerItem.answer}</option>
                                                        )
                                                    })
                                                }
                                            </SelectStyled>
                                            <ErrorMessage>{errorMessage ? errorMessage : ''}</ErrorMessage>
                                        </>

                                    )
                                        :
                                        <>
                                            {
                                                currentAgeAnswer.map((ageAnswer, index) => {
                                                    return (
                                                        <RadioAnswerTypeWrapper key={index}>
                                                            <RadioAnswerSection style={{ width: '55%' }}>
                                                                <h3>Age</h3>
                                                                <Slider
                                                                    ValueLabelComponent={ValueLabelComponent}
                                                                    aria-label="custom thumb label"
                                                                    defaultValue={7}
                                                                    max={26}
                                                                    style={{ color: 'rgb(0, 175, 154)' }}
                                                                    onChange={(event, newValue) => handleAgeChange(event, newValue, ageAnswer)}
                                                                />
                                                            </RadioAnswerSection>
                                                            <RadioAnswerSection>
                                                                <img src={Male} alt="male" />
                                                                <GreenRadio
                                                                    checked={ageAnswer.type === 'male'}
                                                                    onChange={(event) => handleGenderChange(event, ageAnswer)}
                                                                    value="male"
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'male' }}
                                                                />
                                                            </RadioAnswerSection>
                                                            <RadioAnswerSection>
                                                                <img src={Female} alt="female" />
                                                                <GreenRadio
                                                                    checked={ageAnswer.type === 'female'}
                                                                    onChange={(event) => handleGenderChange(event, ageAnswer)}
                                                                    value="female"
                                                                    name="radio-button-demo"
                                                                    inputProps={{ 'aria-label': 'female' }}
                                                                />
                                                            </RadioAnswerSection>
                                                            <RadioAnswerSection>
                                                                <div></div>
                                                                <Button variant="outlined" color="primary" className={classes.add} onClick={handleAddNewChild}>
                                                                    add
                                                   </Button>
                                                            </RadioAnswerSection>
                                                        </RadioAnswerTypeWrapper>
                                                    )
                                                })
                                            }
                                        </>
                                }
                                <ButtonControlsWrapper>
                                    <Button variant="outlined" color="primary" className={classes.button} onClick={handlePrevClick}>
                                        {lang === 'en' ? 'Prev' : 'الرجوع'}
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.right} onClick={handleNextClick}>
                                        {lang === 'en' ? 'Next' : 'التالى'}
                                    </Button>
                                </ButtonControlsWrapper>
                            </>
                        </SurveyMainSection>
                        <SurveyMainSection className="images-section">
                            {/* <img src={require(`../../assets/images/${get(currentQuestionAnswer, 'answer.img', get(currentQuestion, `answers[${currentAnswer.id}].img`, 'martialStatus'))}.png`).default} alt="cc" /> */}
                            <img src={require(`../../assets/images/${get(currentQuestion, `answers[${get(currentAnswer, 'id', 0)}].img`, 'martialStatus')}.png`).default} alt="cc" />
                            <img src={circle} alt="circle" className="circle-image" />
                        </SurveyMainSection>
                    </SurveyMainWrapper>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleSaveClick}>
                        {lang === 'en' ? 'Save' : 'حفظ'}
                    </Button>
                </SurveyWrapper>
            </CSSTransition>
        </TransitionGroup>
    )
}


export default Questions;

const SurveyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin: 30px auto 0px;
    direction: ${props => props.lang === 'en' ? 'ltr' : 'rtl'};
`;


const SurveyMainWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 825px) {
        flex-direction: column;
    }

    .images-section{
        margin-top: 50px;
    }
`;

const SurveyMainSection = styled.div`
  width: 45%;
  min-height: 295px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 825px) {
    width: 96%;
    margin: 0 auto;
  }

  h1
  {
    color: #00AF9A;
    font-size: 36px;
  }

  .quiz-types-carousel{
    margin-bottom: 150px;
  }

  .MuiInput-root {
    width: 100%;
  }

  .MuiFormLabel-root {
    margin-bottom: 50px;
    color:#2D2D2D;
    font-size: 24px;
    display: flex;
    align-items: center;
    align-self: flex-start;
  }

  .circle-image
  {
    position: absolute;
    width: 26%;
    animation: spin 5s ease-in-out infinite;
    -webkit-animation: spin 5s ease-in-out infinite;

    @media only screen and (max-width: 825px) {
        width: 46%;
    }

    @media only screen and (max-width: 525px) {
        width: 66%;
    }

    @media only screen and (max-width: 425px) {
        width: 82%;
    }


    @keyframes spin {
        to {
        -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
        -webkit-transform: rotate(360deg);
        }
    }
  }
`;

const ErrorMessage = styled.p`
    font-size: 18px;
    color: red;
`;

const SelectStyled = styled(Select)`
    .MuiSelect-select.MuiSelect-select {
        background: #00AF9A;
        color: #FFF;
        width: 100%;
        padding: 10px 96px;
    }

    .MuiSelect-icon {
        color: #FFF;
        right: 10px;
    }
`;

const ButtonControlsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const RadioAnswerTypeWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const RadioAnswerSection = styled.div`
    display: flex;
    flex-direction: column;

    h3{
        align-self: flex-start;
        margin-left: 20px;
    }

    img{
        margin-bottom: 15px;
    }
`;


{/* <Carousel className="quiz-types-carousel" auto widgets={[ Buttons]}>
                        {
                            questions.map((question) => {
                                return (
                                    <div>
                                        <FormLabel component="legend"><span style={{color: '#00AF9A', marginRight: '10px', fontSize: '32px'}}>{question.id}</span>{question.question}</FormLabel>
                                        <SelectStyled
                                            native
                                            //value={state.age}
                                            onChange={handleAnswerChange}
                                        >
                                            {
                                                get(question, 'answers', []).map((answerItem) => {
                                                    return (
                                                        <option value={JSON.stringify(answerItem)} style={{color: '#00AF9A', fontSize: '18px', fontWeight: '700', marginTop: '10px'}}>{answerItem.answer}</option>
                                                    )
                                                })
                                            }
                                        </SelectStyled>
                                    </div>
                                )
                            })
                        }
                    </Carousel> */}

{/* <FormLabel component="legend"><span style={{ color: '#00AF9A', marginRight: '10px', fontSize: '32px' }}>{get(currentQuestion, 'id', '')}</span>{get(currentQuestion, 'question', '')}</FormLabel>
                        <SelectStyled
                            native
                            value={JSON.stringify(get(currentQuestionAnswer, 'answer', currentAnswer))}
                            defaultValue={get(currentQuestion, `answers[${0}].answer`)}
                            onChange={handleAnswerChange}
                        >
                            {
                                get(currentQuestion, 'answers', []).map((answerItem) => {
                                    return (
                                        <option value={JSON.stringify(answerItem)} style={{ color: '#00AF9A', fontSize: '18px', fontWeight: '700', marginTop: '10px' }}>{answerItem.answer}</option>
                                    )
                                })
                            }
                        </SelectStyled>
                        <ErrorMessage>{errorMessage ? errorMessage : ''}</ErrorMessage> */}