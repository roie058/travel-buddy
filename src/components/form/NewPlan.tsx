
import dynamic from 'next/dynamic'
const DateInput = dynamic(() => import('../ui/inputs/DateInput'), {
  loading: () => <p>Loading...</p>,
})
const SelectInput = dynamic(() => import('../ui/inputs/Select'), {
  loading: () => <p>Loading...</p>,
})
const ImageInput = dynamic(() => import('../ui/inputs/ImageInput'), {
  loading: () => <p>Loading...</p>,
})
const UiButton = dynamic(() => import('../ui/buttons/UiButton'), {
  loading: () => <p>Loading...</p>,
})



import React, {  useEffect, useState } from 'react'

 type Props = {}

 export const tripCat = [
 {icon:"🧭",en:"Adventure",he:"הרפתקאה",value:'Adventure'},
  {icon:"🏖",en:'Beach & Relaxation',he:"בטן גב",value:'Beach & Relaxation'},
  {icon:"💼",en:"Business",he:"עסקים",value:'Business'},
  {icon:"💵",en:"Budget",he:"תקציב נמוך",value:'Budget'},
  {icon:"🎒",en:"Backpacking",he:"תרמילאות",value:'Backpacking'},
  {icon:"🗿",en:'Culture & History',he:"תרבות והיסטוריה",value:'Culture & History'},
  {icon:"🚴🏼‍♂️",en:"Cycling",he:"אופניים",value:'Cycling'},
  {icon:"🤿",en:'Diving',he:"צלילה",value:'Diving'},
  {icon:"🥐",en:'Food ',he:"אוכל",value:'Food'},
  {icon:"🧑🏽‍🍼",en:'Family Vacation',he:"חופשה משפחתית",value:'Family Vacation'},
  {icon:"🤵🏽👰🏽",en:'Honeymoons',he:"ירח דבש",value:'Honeymoons'},
  {icon:"⛺️",en:'Hiking',he:"מחנאות",value:'Hiking'},
  {icon:"💎",en:"Luxury",he:"יוקרה",value:'Luxury'},
  {icon:"🛣",en:"Road Trip",he:"בדרכים",value:'Road Trip'},
  {icon:"❤️",en:"Romantic",he:"רומנטי",value:'Romantic'},
  {icon:"🛍",en:'Shopping',he:"קניות",value:'Shopping'},
 {icon:"⛷",en:'Skiing',he:"סקי",value:'Skiing'},
{icon:"🧘🏼‍♀️",en:"Spa & Health",he:"ספא ובריאות",value:'Spa & Health'},
 {icon:"🐘",en:"Wildlife & Safaris",he:"חיות וספארי",value:'Wildlife & Safaris'},
 
];



import BeforePrompt from '../newPlan/BeforePrompt'
import NewPlanForm from '../newPlan/NewPlanForm'


const NewPlan = (props: Props) => {
const  [isForm,setIsForm]=useState(false)
  return (<>
  {isForm?
 <NewPlanForm/> :  
  <BeforePrompt />
  }  
  </> 
  )
}

export default NewPlan