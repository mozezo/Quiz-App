import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { updateCurrentType } from '../../redux/actions';
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
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '0',
    font: '24px/38px sans-serif',
    color: '#00AF9A'
  },
  left: {
    left: '0'
  },
  right: {
    right: '0'
  }
}

export default function Buttons (props) {

  // const { state, dispatch } = useContext(TypeProvider);
  // console.log('TypeProvider', state);

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.quiz.lang);

  const prevBtnStyle = Object.assign({}, styles.btn, styles.left)
  const nextBtnStyle = Object.assign({}, styles.btn, styles.right)
  const { index, total, loop, prevHandler, nextHandler } = props;
  
  
  const handlePrevClick = async() => {
    if(index > 0){
      await prevHandler();
      console.log('---prev-index---', index, total);
      dispatch(updateCurrentType(index-1));
    }
  }

  const handleNextClick = async() => {
    if(index+1 < total){
      await nextHandler();
      console.log('---next-index---', index, total);
      dispatch(updateCurrentType(index+1));
    }
  }

  return (
    <div style={styles.wrapper}>
      {
        <div style={prevBtnStyle} onClick={lang === 'en' ? handlePrevClick : handleNextClick}>◀</div>
      }
      { 
        <div style={nextBtnStyle} onClick={lang === 'en' ? handleNextClick : handlePrevClick}>▶</div>
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