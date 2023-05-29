import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from '@mui/material'
import React from 'react'

type Props = {open:boolean,severity?:AlertColor,onClose:(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void,message:string}

const SnackBar = (props: Props) => {
  return (
    <Snackbar open={props.open} onClose={props.onClose} autoHideDuration={5000}>
<Alert elevation={6}  variant="filled" severity={props.severity??'success'} >
    {props.message}
</Alert>

    </Snackbar>
  )
}

export default SnackBar