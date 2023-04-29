import { Button } from '@mui/material';
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'

type Props = {
liked?:boolean,
noIcon?:boolean,
onClick:MouseEventHandler<HTMLButtonElement>
}




const HeartBtn = (props: Props) => {
  let style={fontSize:'1rem',color:'#9B9B9BCC',borderRadius:'15px',textTransform:'capitalize',fontFamily:'Heebo, sans-serif',fontWeight:'bold',padding:'1%'}
if(!props.liked){
style={fontSize:'1rem',color:'#F35757',borderRadius:'50%',textTransform:'capitalize',fontFamily:'Heebo, sans-serif',fontWeight:'bold',padding:'1%'};

}
  return (
    <Button    role='button' onClick={props.onClick} sx={{...style,whiteSpace:"nowrap",minWidth:0,width:"30px" }}>{!props.noIcon&&<Image  alt='Heart' src={`/images/add.png`} width={30} height={30} />}</Button>
  )
}

export default HeartBtn