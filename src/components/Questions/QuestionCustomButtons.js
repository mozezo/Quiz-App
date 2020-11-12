import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { updateCurrentQuestion } from '../../redux/actions';
import { useSelector, useDispatch } from "react-redux";

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0',
    textAlign: 'center'
  },
  btn: {
    width: '120px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '0',
    font: '18px/23px sans-serif',
    color: '#00AF9A',
    padding: '5px 12px',
    border: '1px solid #00AF9A',
    borderRadius: '6px'

  },
  left: {
    left: '0'
  },
  right: {
    right: '0',
    background: '#00AF9A',
    color: '#FFF'
  }
}

export default function Buttons (props) {

  const dispatch = useDispatch();
  //const currentQuestion = useSelector((state) => state.quiz.currentQuestion);

  const prevBtnStyle = Object.assign({}, styles.btn, styles.left)
  const nextBtnStyle = Object.assign({}, styles.btn, styles.right)
  const { index, total, loop, prevHandler, nextHandler } = props;
  
  
  const handlePrevClick = async() => {
    if(index > 0){
      await prevHandler();
      dispatch(updateCurrentQuestion(index-1));
    }
  }

  const handleNextClick = async() => {
    if(index+1 < total){
      await nextHandler();
      dispatch(updateCurrentQuestion(index+1));
    }
  }

  return (
    <div style={styles.wrapper}>
      {
        <div style={prevBtnStyle} onClick={handlePrevClick}>Previous</div>
      }
      { 
        <div style={nextBtnStyle} onClick={handleNextClick}>Next</div>
      }
    </div>
  )
}

Buttons.propTypes = {
  index: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  prevHandler: propTypes.func,
  nextHandler: propTypes.func
}