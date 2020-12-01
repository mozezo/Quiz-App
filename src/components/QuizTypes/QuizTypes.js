import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 're-carousel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import lifeStyle from '../../assets/images/lifeStyle.png';
import ByteCode from '../../assets/images/byteCode.png';
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
        borderRadius: 0,
        padding: '0px 25px',
        color: '#19d4d4',
        border: ' 1px solid #19d4d4',
        alignSelf: 'flex-start',
        marginTop: '120px',
        ['@media (min-width:1440px)']: { 
           fontSize: '24px',
           padding: '0px 35px',
        },
        ['@media (max-width:768px)']: { 
            marginTop: '30px',
            marginBottom: '30px'
         }
    },
}));

const SurveyCarousel = ({ className, history }) => {

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
        history.push(`/questions/${get(currentType, 'id', 1)}`)
    }
    const isAr = lang === 'ar' ? true : false;
    return (
        <div className={className}>
            <Navbar>
                <div><img src={ByteCode} alt="ByteCode" /></div>
                <div> <h5>Hello, Username!</h5></div>
            </Navbar>
            <SurveyWrapper isAr={isAr}>
                <SurveyMainWrapper>
                    <SurveyMainSection type='carousel'>
                        <Carousel className="quiz-types-carousel" auto widgets={[IndicatorDots, Buttons]}>
                            {
                                quizTypes.map((quizType, index) => {
                                    return (
                                        <div> <h1> {quizType.name}</h1></div>
                                    )
                                })
                            }
                        </Carousel>
                    </SurveyMainSection>
                    <SurveyMainSection type='image'>
                        <img src={require(`../../assets/images/${get(currentType, 'img', 'lifeStyle')}.png`).default} className="logo-image" alt="" />
                        <img src={circle} alt="circle" className="circle-image" />
                    </SurveyMainSection>
                </SurveyMainWrapper>
                <Button variant="outlined" color="primary" className={classes.button} onClick={handleStartQuizQuestions}>
                    {isAr ? 'ابدء' : 'Start'}
                </Button>
            </SurveyWrapper>
        </div>
    )
}

const SurveyCarouselWrapper = styled(SurveyCarousel)`
  width: 98vw;
  max-width: 98vw;
  height: 96vh; 
  /* max-height: 90vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: hidden;

  @media only screen and (min-width: 1640px) {
    height: 82vh; 
    max-height: 82vh;
  }

  @media only screen and (max-width: 768px) {
    height: 100%; 
    max-height: 100%;
  }
`;


export default SurveyCarouselWrapper;

const SurveyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    /* margin: 175px auto 0px; */
    margin: 0 auto;
    direction: ${props => props.isAr ? 'rtl' : 'ltr'};

    @media only screen and (max-width: 768px) {
        margin: 0 auto;
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
    align-items: center;
    margin-bottom: 30px;
    @media only screen and (max-width: 768px) {
        flex-direction: column-reverse;
    }
`;

const SurveyMainSection = styled.div`
  width: ${props => props.type === 'carousel' ? '22%' : '45%'};
  height: ${props => props.type === 'carousel' ? '150px' : '100%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin: 65px auto;
  }

  h1
  {
    color: #00AF9A;
    font-size: 45px;
    @media only screen and (min-width: 1440px) {
        font-size: 56px;
    }
    
  }

  .quiz-types-carousel{
      margin-bottom: 150px;
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

  .logo-image
  {
    animation: fadeInDown 1s ease-in-out;
    -webkit-animation: fadeInDown 1s ease-in-out;
    @media only screen and (min-width: 1440px) {
        width: 90%;
        height: 350px;
    }
  }
  .circle-image
  {
    position: absolute;
    width: 29%;
    animation: spin 16s ease-in-out infinite;
    -webkit-animation: spin 16s ease-in-out infinite;

    @media only screen and (min-width: 1440px) {
        width: 38%
    }

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

const Footer = styled.div`
    display: flex;
    padding: 30px 65px 20px;
    .ar
    {
        color: #19d4d4;
        margin-right: 30px;
        opacity: 0.8;
    }

    .en
    {
        color: #FFF;
        margin-right: 30px;
        opacity: 0.8;
    }
`;