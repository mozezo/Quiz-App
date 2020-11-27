import React from 'react'
import PropTypes from 'prop-types'

function Dot (props) {
  return (
    <>
    <span style={{
      display: 'inline-block',
      height: '6px',
      width: '6px',
      borderRadius: '3px',
      backgroundColor: '#00AF9A',
      margin: '7px 5px',
      opacity: props.selected ? '1' : '0.3',
      transitionDuration: '300ms'
    }} />
    </>
  )
}

export default function IndicatorDots (props) {
  const wrapperStyle = {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0px',
    top:'132px',
    textAlign: 'center'
  }

  if (props.total < 2) {
    // Hide dots when there is only one dot.
    return <div style={wrapperStyle} />
  } else {
    return (
      <div style={wrapperStyle}>{
        Array.apply(null, Array(props.total)).map((x, i) => {
          return <Dot key={i} selected={props.index === i} />
        })
       
      }
      <p style={{color: '#00AF9A'}}>{`${props.index+1}/${props.total}`}</p>
      </div>
    )
  }
}

IndicatorDots.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}