
interface ICurvedText{
  label:string
}

const CurvedText: React.FC<ICurvedText>=({ label })=> {
  return (
    <svg id="rotatingText" width="90" height="90" viewBox="0 0 90 90">
      <defs>
        <path
          id="circle"

         
            d="M 45,90 a 45,45 0 1,0 0,-90 a 45,45 0 1,0 0,90"
        ></path>
      </defs>
      <text fill="#F1CDAB" font-size="10" letterSpacing={'1'} fontWeight={'semi-bold'} >
        <textPath xlinkHref="#circle">{label}</textPath>
      </text>
    </svg>
  );
}

export default CurvedText;