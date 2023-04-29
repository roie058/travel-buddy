import { Button } from '@mui/material';
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'

type Props = {
  children?: React.ReactNode,
liked?:boolean,
noIcon?:boolean,
onClick:MouseEventHandler<HTMLButtonElement>
}




const ListButton = (props: Props) => {
  let style={fontSize:'1rem',color:'#9B9B9BCC',border:'1px solid #9B9B9BCC',borderRadius:'15px',textTransform:'capitalize',fontFamily:'Heebo, sans-serif',fontWeight:'bold',padding:'1% 5%'}
if(!props.liked){
style={fontSize:'1rem',color:'#F35757',border:'1px solid #F35757CC',borderRadius:'15px',textTransform:'capitalize',fontFamily:'Heebo, sans-serif',fontWeight:'bold',padding:'1% 5%'};

}
  return (
    <Button   role='button' onClick={props.onClick} sx={{...style,whiteSpace:"nowrap"}}>{props.children}{!props.noIcon&&<Image style={{marginLeft:'5px'}} alt='Heart' src={`/images/${!props.liked?"Heart":'brokenHeart'}.svg`} width={23} height={20} />}</Button>
  )
}

export default ListButton