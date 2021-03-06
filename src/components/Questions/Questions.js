import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 're-carousel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
import ByteCode from '../../assets/images/byteCode.png';
import CrossfadeImage from 'react-crossfade-image';
import { updateCurrentQuestion, updateAnsweredQuestions, updateAnsweredAgeQuestions } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        borderRadius: 0,
        padding: '0px 25px',
        color: '#00AF9A',
        border: ' 1px solid #00AF9A',
        alignSelf: 'flex-start',
        marginTop: '30px',
    },
    right: {
        borderRadius: 0,
        padding: '0px 25px',
        border: ' 1px solid #00AF9A',
        alignSelf: 'flex-start',
        background: '#00AF9A !important',
        color: '#FFF',
        marginTop: '30px',
    },
    add: {
        border: ' 1px solid #00AF9A',
        background: '#00AF9A !important',
        borderRadius: 0,
        padding: '0px 2px',
        color: '#FFF',
        marginTop: '60px',
        marginLeft: '20px'
    },
    save: {
        borderRadius: 0,
        padding: '0px 25px',
        color: '#00AF9A',
        border: ' 1px solid #00AF9A',
        // alignSelf: 'flex-start',
    },
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

    const [currentAgeAnswer, setCurrentAgeAnswer] = useState([]);
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

    const handleAddNewChild = (index) => {
        if(index < currentAgeAnswer.length-1 ){
            let newAgeAnswer = [...currentAgeAnswer];
            newAgeAnswer.splice(index, 1);
            setCurrentAgeAnswer(newAgeAnswer);
        }else{
            let newAgeAnswer = [...currentAgeAnswer, { id: currentAgeAnswer.length, type: '', age: '', img: `${currentAgeAnswer.length}children` }];
            setCurrentAgeAnswer(newAgeAnswer);
        }
    }

    const handleAnswerChange = (event) => {
        setCurrentAnswer(JSON.parse(event.target.value));
        setErrorMessage('');
        var qustionImage = document.getElementById("questionImage");
        qustionImage.classList.remove("question-image");
        void qustionImage.offsetWidth;
        qustionImage.classList.add("question-image");
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

        setCurrentAgeAnswer(get(currentQuestion, `answers`, []))
    }, []);


    useEffect(() => {
        const currentQuestionAnswerValue = currentAnsweredQuestions.find((item) => item.typeId === get(currentQuestion, 'typeId') && item.id === get(currentQuestion, 'id'));
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
                dispatch(updateAnsweredQuestions(currentQuestion, currentAnswer))
                history.push('/quizs')
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
        dispatch(updateAnsweredQuestions(currentQuestion, currentAnswer))
        history.push('/quizs')
    }

    return (
        <Container>
            <Navbar>
                <div><img src={ByteCode} alt="ByteCode" /></div>
                <div> <h5>Hello, Username!</h5></div>
            </Navbar>
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
                                            defaultValue={get(currentQuestion, `answers[${0}].answer`)}
                                            onChange={handleAnswerChange}
                                        >
                                            {
                                                get(currentQuestion, 'answers', []).map((answerItem) => {
                                                    return (
                                                        // <MenuItem value={JSON.stringify(answerItem)}>{answerItem.answer}</MenuItem>
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
                                                            <Button variant="outlined" color="primary" className={classes.add} onClick={() => handleAddNewChild(index)}>
                                                                {index < currentAgeAnswer.length-1 ? 'remove' : 'add'}
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
                        <img id="questionImage" src={require(`../../assets/images/${get(currentQuestion, `answers[${get(currentAnswer, 'id', 0)}].img`, 'martialStatus')}.png`).default} className="question-image" alt="cc" />
                        <img src={circle} alt="circle"  className="circle-image" />
                    </SurveyMainSection>
                </SurveyMainWrapper>
            </SurveyWrapper>
            <Footer>
                <Button variant="outlined" color="primary" className={classes.save} onClick={handleSaveClick}>
                    {lang === 'en' ? 'Save' : 'حفظ'}
                </Button>
            </Footer>
        </Container>
    )
}


export default Questions;


const Container = styled.div`
    /* width: 98vw; */
    max-width: 94vw;
    height: 100vh; 
    /* max-height: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (max-width: 768px) {
        height: 100%; 
        max-height: 100%;
  }
`;


const SurveyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    direction: ${props => props.lang === 'en' ? 'ltr' : 'rtl'};

    @media only screen and (min-width: 1440px){
        max-height: 90vh;
    }
`;



const Navbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 65px 0px;
    color: #19d4d4;

    @media only screen and (max-width: 490px) {
        padding: 50px 45px;
    }
`;

const SurveyMainWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 30px auto 0px;
    @media only screen and (max-width: 825px) {
        flex-direction: column-reverse;
    }

    .images-section{
        margin-top: 50px;
    }
`;

const SurveyMainSection = styled.div`
  width: 35%;
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
    align-self: flex-start;
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

  @keyframes fadeInDown {
  0% {
    opacity: 0.5;
	-webkit-transform: translateX(-1rem);
    }
  100% {
    -webkit-transform: translateZ(0);
    opacity: 1;
  }
}
  .question-image{
    /* width: 60%; */
    animation: fadeInDown 1s ease-in-out;
    -webkit-animation: fadeInDown 1s ease-in-out;
    @media only screen and (min-width: 1440px) {
        /* width: 65%; */
        width: 540px;
        height: 460px;
        object-fit: contain;
        }
   }

  .circle-image
  {
    position: absolute;
    width: 26%;
    animation: spin 16s ease-in-out infinite;
    -webkit-animation: spin 16s ease-in-out infinite;

    @media only screen and (min-width: 1440px) {
        width: 42%;
    }

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

const Footer = styled.div`
    display: flex;
    width: 80%;
    margin: 30px auto;
    padding-bottom: 30px;
`;
