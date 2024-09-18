
interface ICurvedText{
  label:string
}

const CurvedText: React.FC<ICurvedText>=({ label })=> {
  return (
    <svg id="rotatingText" width="140" height="140" viewBox="0 0 140 140">
      <defs>
        <path
          id="circle"

          // d="M 45,80
          //              a 35,35 0 1,0 0,-70
          //              a 35,35 0 1,0 0,70"
          d="M 70,130
          a 60,60 0 1,0 0,-120
          a 60,60 0 1,0 0,120"
        ></path>
      </defs>
      <text fill="#F1CDAB" font-size="16" letterSpacing={'1'} fontWeight={'semi-bold'} >
        <textPath xlinkHref="#circle">{label}</textPath>
        <animateTransform
          attributeName="transform"
          type="rotate"
            from="0 70 70"
          to="360 70 70"
          dur="30s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
}

export default CurvedText;