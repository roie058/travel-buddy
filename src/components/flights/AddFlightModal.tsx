

import React  from 'react'
import AddToPlanModal from '../ui/list/AddToPlanModal'
import { Plan } from '../pageCompnents/Schedule'
import { useMutation } from '@tanstack/react-query'
import { addNewFlight } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'
import { AlertColor } from '@mui/material'
import { useTranslation } from 'react-i18next'


export interface Flight {
    _id?:string,
    airline:{name:string, iata: string, country:string}
    ,destination:{iata:string, name: string, lat: number, lng: number},
     end:Date,
     flightNumber: string,
     origin:{iata: string, name: string, lat: number, lng: number}
     ,start:Date,position:string,price?:number
  
    }


type Props = {open:boolean,onClose:()=>void,flight?:Flight,plans:Plan[],  setSnackBar:(message: string, severity: AlertColor) => void}

const AddFlightModal = (props: Props) => {
const {t}=useTranslation("flights")
const {mutate,isLoading}=useMutation({mutationFn:addNewFlight,onSuccess:()=>{
  props.onClose()
  props.setSnackBar(t("snack.added"),'success')
queryClient.invalidateQueries(["plans"])
}})

    const submitHandler=async (index:number,)=>{
      if(props.flight){
        mutate({flight:props.flight,planId:props.plans[index]._id})
         }   }
        
  return (
    <AddToPlanModal plans={props.plans} open={props.open} onClose={props.onClose} submitHandler={submitHandler} isLoading={isLoading} />
  )
}

export default AddFlightModal