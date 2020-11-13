import React from 'react'
import styled from 'styled-components';
import ByteCodeHome from '../../assets/images/byteCodeHome.png'
import circle from '../../assets/images/circle.png';


const Home = ({className, history}) => {   

    return (
        <div className={className}>
            <HomeNavbar>
                <div></div>
                <div> <h5>Hello, Username!</h5></div>
            </HomeNavbar>
            <HomeMainWrapper>
                <HomeMainSection>
                    <img src={circle} alt="circle" className="circle-image" /> 
                    <img src={ByteCodeHome} alt="ByteCode" style={{marginTop: '0px'}}/>
                    <h2> Bye Bye</h2>
                </HomeMainSection>
                <HomeMainSection>
                    <p>Thanks For Your Feedback!.</p>
                </HomeMainSection>
            </HomeMainWrapper>
        </div>
    )
}

const HomeWrapper = styled(Home)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background-color: #230871;
`;

export default HomeWrapper;

const HomeNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 50px 65px;
    color: #19d4d4;
`;

const HomeMainWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 150px auto;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        margin: 95px auto;
    }
`;

const HomeMainSection = styled.div`
  width: 29%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }

  p
  {
    color: #FFF;
    text-align: left;
    font-size: 26px;
    line-height: 37px;
    font-weight: 700;
    /* margin-top: 175px; */
    margin-bottom: 70px;
    opacity: 0.8;

  }

  h2
    {
      color: #FFF;
      margin-top: 50px;
      opacity: 0.8;
    }

  img
    {
        @media only screen and (max-width: 490px) {
            /* margin-top: 50px !important; */
        }
    }

  .circle-image
  {
    position: absolute;
    width: 26%;
    animation: spin 9s ease-in-out infinite;
    -webkit-animation: spin 9s ease-in-out infinite;

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



