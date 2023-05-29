import PlanCard from '@/components/ui/cards/PlanCard'

import {  useEffect, useState } from 'react'
import styles from '../../styles/Plans.module.css'
import {useSession} from 'next-auth/react'
import axios, { AxiosError } from 'axios'

import { NewSesstion } from '@/pages/api/auth/signup'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { CircularProgress } from '@mui/material'



export default function PlansPage() {

const [plans, setPlans] = useState<undefined|Array<any>>()
const [isLoading, setIsLoading] = useState<boolean>(false)
const {setSnackBar,snackBarProps}=useSnackBar()
const {data:session}=useSession()

const newSession:NewSesstion={...session}

  useEffect(() => {
    const getPlans=async ()=>{
     
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlans',{params:{userId:newSession.user?.id}})
     if(data.success){
       setPlans(data.plans)

       
     }
     } catch (error) {
       if(error instanceof AxiosError){
         const errorMsg=error.response?.data?.error
         console.log(errorMsg);
         
       }
     }
   setIsLoading(false)
    }
    if(session){
      getPlans()
    }}
    ,[session])

const deleteHandler=async(id:string)=>{
  setIsLoading(true)
  try {
    
    const {data}=await axios.delete(`/api/plan/deletePlan`,{params:{planId:id}})
   if (data.success){
    setSnackBar('Plan Removed',"error")
    setPlans((plans)=>plans?.filter((plan)=>plan._id!==id))
   
   }
  } catch  (error) {
    console.log(error);
    
  }
  setIsLoading(false)
  
    }


  return (
    <>
    <SnackBar {...snackBarProps}/>
      <main >
    
       <div className={styles.plans}>
        {!isLoading?( plans && plans.map((plan)=>{
          return <PlanCard deleteHandler={deleteHandler} key={plan.header}  plan={plan}/>
        })):<CircularProgress />
      }
      
       <PlanCard  new/>
       </div>
       
      </main>
    </>
  )
}