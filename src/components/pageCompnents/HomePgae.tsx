

import styles from '@/styles/Home.module.css'

import Hero from '@/components/ui/Hero'
import UiButton from '@/components/ui/buttons/UiButton'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {useSession} from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { NewSesstion } from '@/pages/api/auth/[...nextauth]'





export default function HomePage() {

  const [plans, setPlans] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {data:session,}=useSession()
 
  useEffect(()=>{
  const getPlans=async()=>{
     
    const newSession:NewSesstion={...session}
  try {
    setIsLoading(true)
  const {data} =await axios.get('api/plan/getPlansCount',{params:{userId:newSession.user?.id}})
  if(data.success){
    setPlans(data.count)
  }
  } catch (error) {
    if(error instanceof AxiosError){
      const errorMsg=error.response?.data?.error
      console.log(errorMsg);
      
    }
  }
  setIsLoading(false)
  }
  getPlans()
  },[])
  

const router=useRouter()
const alltripHandler=()=>{
 router.push("/plans")
}

const newtripHandler=()=>{
router.push("/newplan")
}
  return (
    <>
      <main >
        <Hero />
       { !isLoading&& <div className={styles.btngroup}>
     <UiButton className={styles.btn} color='blue' count={plans} clickFn={alltripHandler}  size='large'> All Trips</UiButton>
        <UiButton className={styles.btn}  clickFn={newtripHandler} size='large'>New Trip+</UiButton>
        </div>
        }
        
         </main>
    </>
  )
}