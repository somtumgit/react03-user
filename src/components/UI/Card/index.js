import React from 'react';
import './style.css';

export default function Card(props) {
  if(props.noheader==="true") {
    return (
      <div className='card' {...props}>
        {props.children}
      </div>
    )
  }
  return (
    <div className='card' {...props}>
        <div className="cardHeader">
          {
            props.headerleft && props.headerleft
          }
          {
            props.headerright && props.headerright
          }
        </div>
        {props.children}
    </div>
  )
}
