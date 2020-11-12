import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 're-carousel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
// import lifeStyle from '../../assets/images/lifeStyle.png';
import circle from '../../assets/images/circle.png';
import Quizs from '../../data/Quiz_types.json';
import { useSelector, useDispatch } from "react-redux";
import { updateAnsweredQuestions } from '../../redux/actions';
import { get } from 'lodash';
import Buttons from './QuestionCustomButtons';
import { updateCurrentQuestion } from '../../redux/actions';

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
        marginTop: '120px',
    },
}));

const Questions = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const currentType = useSelector((state) => state.quiz.currentType);
    const currentQuestion = useSelector((state) => state.quiz.currentQuestion);
    console.log('currentQuestion', currentQuestion);
    const [questions, setQuestions] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState(get(currentQuestion, `answers[${0}]`, []));

    const handleAnswerChange = (event) => {
        console.log('handleAnswerChange', JSON.parse(event.target.value));
        setCurrentAnswer(JSON.parse(event.target.value));
        dispatch(updateAnsweredQuestions(currentQuestion, JSON.parse(event.target.value)))
    }

    useEffect(() => {
       let filteredQuestions =  Quizs.questions.filter((item) => {
            return item.typeId === currentType.id
        })
        setQuestions(filteredQuestions);
        dispatch(updateCurrentQuestion(0))
    }, []);

    return (
        <SurveyWrapper>
            <SurveyMainWrapper>
                <SurveyMainSection >
                    <h1>{currentType.name}</h1>
                    <Carousel className="quiz-types-carousel" auto widgets={[ Buttons]}>
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
                    </Carousel>
                </SurveyMainSection>
                <SurveyMainSection className="images-section">
                    <img src={require(`../../assets/images/${get(currentQuestion, `answers[${currentAnswer.id}].img`, 'martialStatus')}.png`).default} alt="cc" />
                    <img src={circle} alt="circle" className="circle-image" />
                </SurveyMainSection>
            </SurveyMainWrapper>
            <Button variant="outlined" color="primary" className={classes.button}>
                Save
            </Button>
        </SurveyWrapper>
    )
}


export default Questions;

const SurveyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin: 30px auto 0px;
`;


const SurveyMainWrapper = styled.div`
    display: flex;
    justify-content: space-between;

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
  }

  .circle-image
  {
    position: absolute;
    width: 26%;
    animation: spin 5s ease-in-out infinite;
    -webkit-animation: spin 5s ease-in-out infinite;
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