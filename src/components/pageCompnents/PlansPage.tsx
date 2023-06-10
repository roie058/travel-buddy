import PlanCard from '@/components/ui/cards/PlanCard'
import styles from '../../styles/Plans.module.css'
import {useSession} from 'next-auth/react'
import { NewSesstion } from '@/pages/api/auth/signup'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { CircularProgress } from '@mui/material'
import { useQuery,useMutation} from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { deleteHandler, getPlans } from '@/util/fetchers'
export default function PlansPage() {

const {setSnackBar,snackBarProps}=useSnackBar()
const {data:session}=useSession()
const newSession:NewSesstion={...session}
const {t}=useTranslation("common")

const {data,isLoading,error,refetch:refetchPlans}= useQuery(['plans'],()=>getPlans(newSession),{enabled:!!newSession?.user?.id})
if(error){
  setSnackBar(t("errorMsg.fetchPlans"),"error")
}

const mutation=useMutation({mutationFn:deleteHandler,onSuccess:()=>{setSnackBar(t("errorMsg.deletePlan"),"error");refetchPlans();}})


  return (
    <>
    <SnackBar {...snackBarProps}/>
      <main >
       <div className={styles.plans}>
        {!isLoading?( data && data.map((plan)=>{
          return <PlanCard deleteHandler={mutation.mutate} key={plan.header}  plan={plan}/>
        })):<CircularProgress size={'5rem'}  />
      }
       <PlanCard  new/>
       </div>
       
      </main>
    </>
  )
}