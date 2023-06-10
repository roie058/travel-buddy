
import { Box, List, ListItem, ListItemButton, ListItemText, Paper, Typography, useMediaQuery } from '@mui/material'

import moment from 'moment'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'

import UiButton from '../ui/buttons/UiButton'
import AddExpenseModal from './AddExpenseModal'
import styles from './BudgetBoard.module.css'
import { Expense, Plan } from '../pageCompnents/Schedule'
import { Flight } from '../flights/AddFlightModal'
import DeleteIcon from '../../../public/images/delete.svg'
import SnackBar from '../ui/SnackBar'
import useSnackBar from '@/hooks/useSnackBar'
import { useTranslation } from 'next-i18next'
import {useMutation} from "@tanstack/react-query"
import { deleteExpense } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'
type Props = {plan:Plan}


const BudgetBoard = (props: Props) => {
  const [budget, setBudget] = useState<{transportation:number,budget:number,expenses:number,hotels:number,stops:number}>()
  const [totalCost, setTotalCost] = useState<number>()
  const [stopsBudget, setStopsBudget] = useState<Array<Expense>>()
  const [open, setOpen] = useState<boolean>(false)
  const {setSnackBar,snackBarProps}=useSnackBar()
  const {t}=useTranslation("plan")

const currency=props.plan?.budget?.currency??'$'

useEffect(() => {
    if(props.plan){
      const rutineExpenses=props.plan.days.flatMap((day)=> (day.rutine.reduce((prv:Expense[],cur)=>{
        if(cur.budget&&cur.budget>0){
          return [...prv,{name:cur.place.name,category:cur.place?.category?.key??'Note',price:cur.budget}]
        }else return prv
         },[])))
         setStopsBudget(rutineExpenses)
        const sumBudget={
          budget:props?.plan?.budget.budget,
          transportation:[...props.plan.budget.transportation,...props.plan.flights].reduce((prv,cur:Expense|Flight)=>{return cur?.price? prv+ cur?.price:0},0),
          expenses:props.plan.budget.expenses.reduce((prv,cur)=>{return cur?.price? prv+ cur?.price:0},0),
          hotels:props.plan.hotels.reduce((prv,cur)=>{return prv+ (moment(cur.end).dayOfYear() - moment(cur.start).dayOfYear())*cur.nightPrice},0),
        stops:rutineExpenses.reduce((prv,cur)=>{return cur?.price? prv+ cur?.price:0},0)
        }
        setBudget(sumBudget)
    setTotalCost( sumBudget?.expenses+ sumBudget?.hotels+sumBudget?.transportation+sumBudget?.stops)
    }
}, [props])

const {mutate}=useMutation({mutationFn:deleteExpense,onSuccess:()=>{
  setSnackBar(t("snack.expenseRemoved"),"error")
queryClient.invalidateQueries(["plan",props.plan._id])

}})

const deleteExpenseHandler=async (id:string|undefined,type:"transportation"|'expenses')=>{
  if(!id)return;
  mutate({planId:props?.plan?._id,expenseId:id,expenseType:type})
}



const isMobile=useMediaQuery('(max-width:600px)')


  return (
    <>
   {budget &&  <Paper sx={
        {
          backgroundColor:'white',
          padding:'10%',
        }  
      }>
          <Box display={"flex"} justifyContent="space-between" >
      <Typography fontWeight={'bold'} fontSize={isMobile? '1.5rem' :'2rem'} variant="h2">{t("budget.header")}:</Typography>
      <Typography fontWeight={'bold'} fontSize={isMobile? '1.5rem' :'2rem'}  variant="h2">{props.plan.budget.budget +currency}</Typography>
      </Box>
      <Box marginTop={'3%'}>
      <Box display={"flex"} justifyContent="space-between"  >
      <Typography fontWeight={'bold'} color="GrayText" fontSize={isMobile?'1rem':'1.5rem'} variant="h3">{t("budget.accommodations")}:</Typography>
      <Typography fontWeight={'bold'} color="GrayText" fontSize={isMobile?'1rem':'1.5rem'} variant="h3">{budget.hotels+currency}</Typography>
      </Box>
      <List>
          {props.plan.hotels.map((accommodation,i)=>
          <ListItem key={i} sx={{justifyContent:'space-between'}} disablePadding>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{accommodation.place.name}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{moment(accommodation.end).dayOfYear() - moment(accommodation.start).dayOfYear()} Nights</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{accommodation.nightPrice+currency}</ListItemText>
          </ListItem>
          )}
      
      </List>
      </Box>
      <Box marginTop={'3%'}>
      <Box display={"flex"} justifyContent="space-between"  >
      <Typography fontWeight={'bold'} color="GrayText" fontSize={isMobile?"1rem":'1.5rem'} variant="h3">{t("budget.transportation")}:</Typography>
      <Typography fontWeight={'bold'} color="GrayText" fontSize={isMobile?"1rem":'1.5rem'} variant="h3">{budget.transportation+currency}</Typography>
      </Box>
      <List>
          {props.plan.flights.map((transport,i)=>
          <ListItem key={i+transport.flightNumber} sx={{justifyContent:'space-between'}} disablePadding>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{ transport?.origin.iata+"-"+transport?.destination.iata}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{'flight'}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{transport.price+currency}</ListItemText>
          </ListItem>
          )}

          {props.plan.budget.transportation.map((transport,i)=>
          <ListItem className={styles.listItem} key={i} sx={{justifyContent:'space-between',position:'relative'}} disablePadding>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{transport.name}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{transport.category}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{transport.price+currency}</ListItemText>
          <ListItemButton onClick={()=>{deleteExpenseHandler(transport._id,'transportation')}} className={styles.removeBtn} sx={{display:isMobile?'flex':'none',right:'100%',position:'absolute',flex:"none",color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}} ><Image  alt='delete expense' src={DeleteIcon } fill sizes='15px' /></ListItemButton>
          </ListItem>
          )}
          
      
      </List>
      </Box>
      <Box marginTop={'3%'}>
      <Box display={"flex"} justifyContent="space-between"  >
      <Typography fontWeight={'bold'} color="GrayText" fontSize={isMobile?"1rem":'1.5rem'} variant="h3">{t("budget.expenses")}:</Typography>
      <Typography fontWeight={'bold'} color="GrayText" fontSize={isMobile?"1rem":'1.5rem'} variant="h3">{budget.expenses+budget.stops+currency}</Typography>
      </Box>
      <List>
          {props.plan.budget.expenses.map((expense,i)=>
          <ListItem className={styles.listItem} key={i} sx={{justifyContent:'space-between'}} disablePadding>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{expense.name}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{expense.category??'other'}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{expense.price+currency}</ListItemText>
          <ListItemButton  onClick={()=>{deleteExpenseHandler(expense._id,'expenses')}} className={styles.removeBtn} sx={{display:isMobile?'flex':'none',right:'100%',position:'absolute',flex:"none",color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold',width:'15px',height:'15px'}} ><Image alt='delete expense' fill src={DeleteIcon } sizes='15px'  /></ListItemButton>
          </ListItem>
          )}
          {stopsBudget&&stopsBudget.map((expense,i)=>
          <ListItem key={i+expense.name} sx={{justifyContent:'space-between'}} disablePadding>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{expense.name}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{expense.category??'other'}</ListItemText>
          <ListItemText sx={{flex:'none'}} primaryTypographyProps={{color:"#959595",fontSize:isMobile?'0.8rem':'1rem',fontWeight:'bold'}}  >{expense.price+currency}</ListItemText>
          </ListItem>
          )}
          
      
      </List>
      </Box>
      <Box marginTop={'10%'} display="flex" flexDirection={"column"} justifyContent="center">
          <Box marginBottom={'15%'} gap="10px" display={"flex"} flexDirection={'column'}  >
          <Typography fontWeight={"bold"} textAlign={"center"} variant="h2" fontSize={isMobile?'1.5rem':"2rem"}>{t("budget.total")}: {totalCost+currency}</Typography>
          <Typography fontWeight={"bold"} textAlign={"center"} variant="h2" fontSize={isMobile?'1.5rem':"2rem"}>{t("budget.left")}: <span style={{color:budget.budget-Number(totalCost)>=0?'#65E76B':"#F35757"}} > {props.plan.budget.budget-Number(totalCost)+currency}</span></Typography>
          </Box>
      <UiButton clickFn={()=>{setOpen(true)}} color='blue' >{t("budget.button")}</UiButton>
      </Box>
      
      </Paper>
    
    }
    <AddExpenseModal openSnackBar={setSnackBar}  open={open} onClose={()=>{setOpen(false)}} />
    <SnackBar {...snackBarProps} />
  </>)
}

export default BudgetBoard