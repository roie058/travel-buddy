import { Dialog, IconButton } from '@mui/material'
import React, { useState } from 'react'


type Props = {
color:string
icon:JSX.Element
children:JSX.Element|JSX.Element[]
}

const ButtonModalWrapper = (props: Props) => {
    const [open,setOpen]=useState(false)
  return (
    <>
    <IconButton onClick={()=>setOpen(true)} sx={{background:props.color}}>{props.icon}</IconButton>
    <Dialog  open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="xl" >
        {props.children}
    </Dialog>
    </>
  )
}

export default ButtonModalWrapper