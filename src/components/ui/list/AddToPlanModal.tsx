
import { Plan } from '@/components/pageCompnents/Schedule'
import { IPlace } from '@/dummyData'

import { Avatar, CircularProgress, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'


import moment from 'moment'
import Image from 'next/image'
import React from 'react'

type Props = {open:boolean,onClose:()=>void,clickedLocation?:IPlace,type?:'restaurants'|'hotels'|'attractions',submitHandler:(index: number) => Promise<void>,isLoading:boolean,plans:Plan[]}

const AddToPlanModal = (props: Props) => {



  return (
    <Dialog fullWidth onClose={props.onClose} open={props.open}>
       <DialogTitle>Add to Plan</DialogTitle>
<List sx={{ pt: 0 }}>
    {props.plans&& props?.plans.map((plan:Plan,i)=>{
    return <ListItem sx={{padding:'3%'}} key={plan._id} disableGutters>
          
            <ListItemAvatar>
              <Avatar  >
              <Image style={{objectFit:"cover"}} alt={plan._id} fill  src={plan.image}/> 
              </Avatar>
            </ListItemAvatar>
            <ListItemText sx={{width:'100%'}}  primary={plan.header} secondary={`${plan.country} ${moment(new Date(plan.start)).format('DD.MM')} - ${moment(new Date(plan.end)).format('DD.MM')}` }  />
          
          {props.clickedLocation&&props.type&&  <ListItemButton  sx={{justifyContent:'flex-end',width:'40px',height:'40px',padding:'0'}} onClick={()=>props.submitHandler(i)} key={plan._id}>
              <Image width={30} height={30} src={plan.liked[props.type].find((place)=>(props?.clickedLocation?.location_id==place.location_id))?'/images/added.png':'/images/add.png'} alt='add to list button' />
          </ListItemButton>}
          {!props.clickedLocation && (props.isLoading ?<CircularProgress/>:
            <ListItemButton  sx={{justifyContent:'flex-end',width:'40px',height:'40px',padding:'0'}} onClick={()=>props.submitHandler(i)} key={plan._id}>
              <Image width={30} height={30} src={'/images/add.png'} alt='add to list button' />
          
          </ListItemButton>)}
    
        </ListItem>}
)}
</List>
    </Dialog>
  )
}

export default AddToPlanModal