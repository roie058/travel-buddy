import { Box, Button, Icon, Tooltip } from '@mui/material';
import { relative } from 'path';
import React, { ReactElement, useState } from 'react'

type Props = {
    children?:ReactElement<any, any>|ReactElement<any, any>[];
    title:string
right?:string,
top?:string
}

const ToolTip = ({children,title,top,right}:Props) => {
    const [open,setOpen]=useState(false)
  return (
    <Tooltip  open={open}  title={title} arrow   >
        <Box sx={{position:'relative'}}>
        <Button onMouseLeave={()=>setOpen(false)} onMouseEnter={()=>setOpen(true)} onClick={()=>setOpen(!open)}  sx={{position:'absolute',top:top??'-30%',right:right??"-3%",color:'black',padding:'12px',width:20,minWidth:'20px',height:'20px',borderRadius:'50%',border:'1px solid rgba(0, 0, 0, 0.23)',backgroundColor:'white',zIndex:1}}>?</Button>
        {children}
        </Box>
    </Tooltip>
  )
}

export default ToolTip