import Head from 'next/head'

import styles from '@/styles/Home.module.css'

import Hero from '@/components/ui/Hero'
import UiButton from '@/components/ui/buttons/UiButton'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {useSession} from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'




export default function Home() {

  const [plans, setPlans] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {data:session,}=useSession()
  
  useEffect(()=>{
  const getPlans=async()=>{
    const id= {userId:session?.user?.id} 
  try {
    setIsLoading(true)
  const {data} =await axios.get('api/plan/getPlansCount',{params:{userId:id.userId}})
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
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Hero />
       { !isLoading&& <div className={styles.btngroup}>
     <UiButton className={styles.btn} color='blue' count={plans} clickFn={alltripHandler}  size='large'> All Trips</UiButton>
        <UiButton className={styles.btn}  clickFn={newtripHandler} size='large'>New Trip+</UiButton>
        </div>}
        
         </main>
    </>
  )
}
