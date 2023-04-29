
import axios from 'axios'
import React, {  useState } from 'react'
import AddToPlanModal from '../ui/list/AddToPlanModal'
import { Plan } from '@/pages/plans/[planId]/schedule'

export interface Flight {
    _id?:string,
    airline:{name:string, iata: string, country:string}
    ,destination:{iata:string, name: string, lat: number, lng: number},
     end:Date,
     flightNumber: string,
     origin:{iata: string, name: string, lat: number, lng: number}
     ,start:Date,position:string,price?:number}


type Props = {open:boolean,onClose:()=>void,flight?:Flight,plans:Plan[]}

const AddFlightModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false)



    const submitHandler=async (index:number,)=>{
      if(props.flight){
          try {
            setIsLoading(true)
            const {data} = await axios.patch('/api/flight/newFlight',{flight:props.flight,planId:props.plans[index]._id})
            if(data.success){
             props.plans[index].flights.push(data.flight) 
             props.onClose()
            }else{
              console.log(data.error);  
            }
            
          } catch (error) {
            console.log(error);
          }
      }
        setIsLoading(false)
        }
        
  return (
    <AddToPlanModal plans={props.plans} open={props.open} onClose={props.onClose} submitHandler={submitHandler} isLoading={isLoading} />
  )
}

export default AddFlightModal