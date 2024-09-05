import React from 'react';
import style from './Home.module.scss'
import imageSeven from 'assets/images/img7.png'

function CurvedText({text}) {
  return (
    <svg id="rotatingText" width="90" height="90" viewBox="0 0 90 90">
    <defs>
      <path
        id="circle"
      
        d="M 45,80
                       a 35,35 0 1,0 0,-70
                       a 35,35 0 1,0 0,70"
      ></path>
    </defs>
    <text fill="#F1CDAB" font-size="8" letterSpacing={'2'} fontWeight={'bold'}>
      <textPath xlinkHref="#circle">Sumathinath</textPath>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 45 45"
        to="360 45 45"
        dur="30s"
        repeatCount="indefinite"
      />
    </text>
  </svg>
  );
}

export default CurvedText;