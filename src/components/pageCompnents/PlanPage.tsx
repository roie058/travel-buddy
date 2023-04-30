import BudgetBoard from '@/components/dash/BudgetBoard'
import DashBtns from '@/components/dash/DashBtns'
import { PlanContext } from '@/context/plan-context'


import { CircularProgress, Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


import React, { useEffect, useState } from 'react'
import { Plan } from './Schedule'
import { NewSesstion } from '@/pages/api/auth/[...nextauth]'


type Props = {}


const PlanPage = (props: Props) => {
  const{ query}=useRouter()

  const [list,setList ] =useState<Plan>()
const [isLoading,setIsLoading]=useState(false)
  const {data:session}=useSession()

  useEffect(() => {
    const getPlan=async ()=>{
      const newSession:NewSesstion={...session}
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlan',{params:{userId:newSession.user?.id,planId:query.planId}})
     if(data.success){
       setList(data.plan)
       console.log(data.plan);
       
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
      getPlan()
    }

   }, [session,query.planId])





  return (
    <>
    {isLoading ? <CircularProgress sx={{padding:'20% 40%'}} size={'10vw'}/> :
    <>
  {list&& <PlanContext.Provider value={{plan:list}}>
    <main style={{justifyContent:'normal',height:'100%'}}>

    <Grid justifyContent={"center"}    columnGap={1} rowGap={1}   container >
        <Grid md={5.5} sm={10} xs={11} item>
        { list&&<BudgetBoard plan={list} setList={setList}/> }
</Grid>
<Grid md={5.5} sm={10} xs={11} display="flex" sx={{minHeight:'100vh'}}   flexDirection={'column'} gap="10px" item>
{ list&&<DashBtns plan={list}/>}
</Grid>
</Grid>

    </main>
    </PlanContext.Provider>
  }
  </>
    }
 
  </>
  )
}

export default PlanPage