import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import ByteCodeHome from '../../assets/images/byteCodeHome.png'
import circle from '../../assets/images/circle.png';
import { saveLang } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        color: '#19d4d4',
        border:' 1px solid #19d4d4',
        borderRadius: 0,
        padding: '0px 25px',
        alignSelf: 'flex-start',
        opacity: 0.8,
    },
    langButton: {
        color: '#FFF',
        border: 'none',
        alignSelf: 'flex-start',
        opacity: 0.8,
    },
    langButtonActive: {
        color: '#19d4d4',
        border: 'none',
        alignSelf: 'flex-start',
        opacity: 0.8,
    }
}));

const Home = ({className, history}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const arabicTitle = 'صممت هذة الصفحة لمعرفة عملائنا بشكل افضل , وذلك لتقيم مزايا وعروض تتناسب مع نمط حياتهم';
    const englishTitle = 'this page is designed to know our clients better, in order to provide features and offers thats suit thier lifestyle.';
    const lang = useSelector((state) => state.quiz.lang);
    
    const handleStartQuiz = () => {
        console.log('handleStartQuiz')
        history.push('/quizs')
    }

    const handleLangChange = (lang) => {
        console.log('handleLangChange', lang);
        dispatch(saveLang(lang));
    }

    return (
        <div className={className}>
            <HomeNavbar>
                <div></div>
                <div> <h5>Hello, Username!</h5></div>
            </HomeNavbar>
            <HomeMainWrapper lang={lang}>
                <HomeMainSection lang={lang}>
                    <img src={circle} alt="circle" className="circle-image" /> 
                    <img src={ByteCodeHome} alt="ByteCode" className="logo-image"/>
                    <h2>{lang === 'en' ? 'Welcome' : 'اهلا بك' } </h2>
                </HomeMainSection>
                <HomeMainSection lang={lang}>
                    <p>{lang === 'en' ? englishTitle : arabicTitle}</p>
                    <Button  variant="outlined" color="primary" className={classes.button} onClick={handleStartQuiz}>
                        {lang === 'en' ? 'Start' : 'البدء' }
                    </Button>
                </HomeMainSection>
            </HomeMainWrapper>
            <Footer>
                <Button  variant="outlined" color="primary" className={lang === 'ar' ? classes.langButtonActive : classes.langButton} onClick={() => handleLangChange('ar')}>
                    Ar
                </Button>
                <Button  variant="outlined" color="primary" className={lang === 'en' ? classes.langButtonActive : classes.langButton} onClick={() => handleLangChange('en')}>
                    En
                </Button>
            </Footer>
        </div>
    )
}

const HomeWrapper = styled(Home)`
  width: 100vw;
  max-width: 100vw;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #230871;
  overflow-y: hidden;

  @media only screen and (max-width: 768px) {
    height: 100%; 
  }
`;

export default HomeWrapper;

const HomeNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 50px 65px 0px;
    color: #19d4d4;
`;

const HomeMainWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 0 auto;
    direction: ${props => props.lang === 'ar' ? 'rtl' : 'ltr'};

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        margin: 95px auto;
    }
`;

const HomeMainSection = styled.div`
  width: 36%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 10px auto;
  }

  p
  {
    color: #FFF;
    text-align: ${props => props.lang === 'ar' ? 'right' : 'left'};
    font-size: 26px;
    margin-bottom: 70px;
    opacity: 0.8;
    margin-top: 45%;
  }

  h2
    {
      margin-top: 50px;
      opacity:0.8;
      color:#FFFFFF;
      font-size:45px;
      @media only screen and (max-width: 768px) {
        font-size:29px;
      }
    }

  img
    {
        @media only screen and (max-width: 490px) {
            /* margin-top: 50px !important; */
        }
    }

  .logo-image
  {
    width: 80%;
    margin-top: 15%;
    @media only screen and (max-width: 768px) {
        width: 50%;
    }
  }
  .circle-image
  {
    position: absolute;
    width: 32%;
    animation: spin 16s ease-in-out infinite;
    -webkit-animation: spin 16s ease-in-out infinite;

    @media only screen and (max-width: 950px) {
        width: 48%;
    }

    @media only screen and (max-width: 490px) {
        width: 85%;
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


