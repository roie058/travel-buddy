
import { Box } from '@mui/material'

import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import UiButton from '../buttons/UiButton'
import Pill from '../Pill'
import styles from './PlanCard.module.css'
import { Plan } from '@/components/pageCompnents/Schedule'
import DeleteIcon from '../../../../public/images/delete.svg'
import { useTranslation } from 'next-i18next'


type Props = {

plan?:Plan
new?:boolean
deleteHandler?:(id:string)=>void
}



 

const PlanCard = (props: Props) => {
const router=useRouter()
const dates= moment(props.plan?.start).format('DD/MM/YYYY')+'-'+ moment(props.plan?.end).format('DD/MM/YYYY') ;
  const newtripHandler=()=>{
    router.push("/newplan")
  }
const {t}=useTranslation('common')
  const edittripHandler=()=>{
    router.push(`/plans/${ props.plan? props.plan._id : '/plans'}`)
  }

 



 let card= <div className={styles.new_card}>
 <UiButton className={styles.btn}  size="small" clickFn={newtripHandler} >{t('profile.newPlan')}</UiButton>
 </div>

if(!props.new&&props.plan&&props.deleteHandler){
card=<Box className={styles.card}>

<div className={styles.main_img}>
<Image priority style={{objectFit:"cover",objectPosition:'0 30%',borderTopLeftRadius:'12px',borderTopRightRadius:'12px'}} width={300} height={150} alt={props.plan?props.plan.country:'place'} src={props?.plan.image} />

</div>


<button onClick={()=>props.deleteHandler(props.plan?._id??'')} className={styles.deleteBtn}><Image alt='delete trip' width={35} height={35} src={DeleteIcon} /></button>  
<h3 className={styles.place}>{props.plan?props.plan.header:''} </h3>

<h3 className={styles.dates}>{props.plan?props.plan.country:''}</h3>
<p className={styles.dates}> {dates}</p>
<div className={styles.tags}>{props.plan?props.plan.tags.map((tag,i)=>{
  const colors=['#FFB74A',"#52FEF4","#6900D1"]
 return <Pill key={tag} text={tag} color={colors[i]}/>
  

}):''}      
</div>

<Box display={'flex'} justifyContent='center' paddingBottom={3} >

<UiButton className={styles.btn}  size="small" clickFn={edittripHandler} color='blue' >{t('profile.edit')}</UiButton>

</Box>

</Box> 

}

  return (
  card
  )
}

export default PlanCard