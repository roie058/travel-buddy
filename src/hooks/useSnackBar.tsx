import { AlertColor } from '@mui/material'
import React, { useState } from 'react'



const useSnackBar = () => {
const [open, setOpen] = useState(false)
const [props, setProps] = useState<{message:string,severity:AlertColor,onClose:()=>void,}>({message:'',severity:'success',onClose:()=>{setOpen(false)}})


const setSnackBar=(message:string,severity:AlertColor)=>{
setOpen(true)
setProps((prop)=>({...prop, message,severity}))
}


  return {
snackBarProps:{...props,open},
setSnackBar,
  }
    
  
}

export default useSnackBar