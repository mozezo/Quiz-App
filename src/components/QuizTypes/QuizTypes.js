import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 're-carousel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import lifeStyle from '../../assets/images/lifeStyle.png';
import circle from '../../assets/images/circle.png';
import Buttons from './CustomButtons';
import IndicatorDots from './DotsIndicator';
import Quizs from '../../data/Quiz_types.json';
import QuizsAr from '../../data/Quiz_types_ar.json';
import { useSelector, useDispatch } from "react-redux";
import { get } from 'lodash';
import { updateCurrentType } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
        color: '#19d4d4',
        border: ' 1px solid #19d4d4',
        alignSelf: 'flex-start',
        opacity: 0.8,
        padding: '8px 36px',
        marginTop: '120px',
        // marginLeft: '10%'
    },
}));

const SurveyCarousel = ({history}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [quizTypes, setQuizTypes] = useState([]);
    // const [lang, setLang] = useState('en');
    const currentType = useSelector((state) => state.quiz.currentType);
    const lang = useSelector((state) => state.quiz.lang);

    useEffect(() => {
        console.log('QuizsArrr', QuizsAr);
        lang === 'ar' ? setQuizTypes(QuizsAr.sourceType) : setQuizTypes(Quizs.sourceType);
        dispatch(updateCurrentType(0));
    }, []);

    const handleStartQuizQuestions = () => {
        history.push(`/questions/${currentType.id}`)
    }
    const isAr = lang === 'ar' ? true : false;
    return (
        <SurveyWrapper isAr={isAr}>
            <SurveyMainWrapper>
                <SurveyMainSection>
                    <Carousel className="quiz-types-carousel" auto widgets={[IndicatorDots, Buttons]}>
                        {
                            quizTypes.map((quizType) => {
                                return (
                                    <div> <h1> {quizType.name}</h1></div>
                                )
                            })
                        }
                    </Carousel>
                </SurveyMainSection>
                <SurveyMainSection>
                    <img src={require(`../../assets/images/${get(currentType, 'img', 'lifeStyle')}.png`).default} alt="" /> 
                    <img src={circle} alt="circle" className="circle-image" />
                </SurveyMainSection>
            </SurveyMainWrapper>
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleStartQuizQuestions}>
                {isAr ? 'ابدء' : 'Start'}
            </Button>
        </SurveyWrapper>
    )
}

const SurveyCarouselWrapper = styled(SurveyCarousel)``;


export default SurveyCarouselWrapper;

const SurveyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    margin: 175px auto 0px;
    direction: ${props => props.isAr? 'rtl' : 'ltr'};

    @media only screen and (max-width: 768px) {
        margin: 0 auto;
    }
`;


const SurveyMainWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const SurveyMainSection = styled.div`
  width: 29%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin: 95px auto;
  }

  h1
  {
    color: #00AF9A;
    font-size: 36px;
    text-align: center;
  }

  .quiz-types-carousel{
      margin-bottom: 150px;
  }

  .circle-image
  {
    position: absolute;
    width: 26%;
    animation: spin 5s ease-in-out infinite;
    -webkit-animation: spin 5s ease-in-out infinite;

    @media only screen and (max-width: 950px) {
        width: 48%;
    }

    @media only screen and (max-width: 490px) {
        width: 94%;
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
