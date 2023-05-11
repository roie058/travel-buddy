import { Badge, Button } from '@mui/material'
import styles from 'UiButton.module.css'
import React, { useEffect, useState } from 'react'
type Props = {
  children:string,
  clickFn:()=>void,
  size?:'small'|'medium'|'large'|undefined,
  color?:'blue'|undefined,
  count?:number,
  className?:string|undefined
  submit?:boolean
  disabled?:boolean,
  style?:any
}



const UiButton = (props: Props) => {
  const [color,setColor]=useState({background: "linear-gradient(51deg, rgba(0,194,202,1) 0%, rgba(55,193,199,1) 100%)"})
  
  useEffect(() => {
    if (props.color==='blue'){
      setColor({background: "linear-gradient(51deg, rgba(3,59,136,1) 0%, rgba(0,109,209,1) 100%)"})
      }
  }, [props])
  



  return (
    
    <Button  disabled={props.disabled} type={props.submit?"submit":'button'} className={`${props.className} btn`} size={props.size} onClick={props.clickFn} variant="contained" sx={{boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.25)",fontWeight:'bold',fontSize:'1.5rem' ,padding:'3% 15%',textTransform:'capitalize', ...color,borderRadius:'12px',...props.style}}>
<Badge   showZero invisible={!props.count} badgeContent={props.count} sx={{'& .MuiBadge-badge':{

backgroundColor:'white',
color:'black',
right:'-17%',
top:'20%',
fontWeight:'bold',

}}}>
{props.children}
</Badge>
    </Button>
    
    
  )
}

export default UiButton