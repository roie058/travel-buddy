import PlanCard from '@/components/ui/cards/PlanCard'


import Head from 'next/head'
import {  useEffect, useState } from 'react'
import styles from '../../styles/Plans.module.css'
import {useSession} from 'next-auth/react'
import axios, { AxiosError } from 'axios'



export default function Plan() {

const [plans, setPlans] = useState<undefined|Array<any>>()
const [isLoading, setIsLoading] = useState<boolean>(false)

const {data:session,}=useSession()

const id= {userId:session?.user?.id} 
  useEffect(() => {
    const getPlans=async ()=>{
     
     try {
       setIsLoading(true)
     const {data} =await axios.post('/api/plan/getPlans',id)
     if(data.success){
       setPlans(data.plans)
       console.log(data.plans);
       
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
    }},[session])

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
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy all plans and plan editing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
    
       <div className={styles.plans}>
        {!isLoading&& plans && plans.map((plan)=>{
          return <PlanCard deleteHandler={deleteHandler} key={plan.header}  plan={plan}/>
        })}
      
       <PlanCard new/>
       </div>
       
      </main>
    </>
  )
}