import PlanCard from '@/components/ui/cards/PlanCard'

import {  useEffect, useState } from 'react'
import styles from '../../styles/Plans.module.css'
import {useSession} from 'next-auth/react'
import axios, { AxiosError } from 'axios'

import { NewSesstion } from '@/pages/api/auth/signup'



export default function PlansPage() {

const [plans, setPlans] = useState<undefined|Array<any>>()
const [isLoading, setIsLoading] = useState<boolean>(false)

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
    setPlans((plans)=>plans?.filter((plan)=>plan._id!==id))
   
   }
  } catch  (error) {
    console.log(error);
    
  }
  setIsLoading(false)
  
    }


  return (
    <>
      <main >
    
       <div className={styles.plans}>
        {!isLoading&& plans && plans.map((plan)=>{
          return <PlanCard deleteHandler={deleteHandler} key={plan.header}  plan={plan}/>
        })}
      
       <PlanCard  new/>
       </div>
       
      </main>
    </>
  )
}