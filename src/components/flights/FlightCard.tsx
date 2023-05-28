import { Card, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

import { Flight } from './AddFlightModal'

type Props = {flight:Flight}

const FlightCard = (props: Props) => {
  return (
    <>
    <Card sx={{position:'relative',width:'100%',borderRadius:'0',overflow:'visible',height:"120px" }}     >
    <ListItemIcon  sx={{flexGrow:'0',display:'flex',justifyContent:'left',position:"absolute",left:'12px',top:'0',height:'100%',width:'20%'}}  ><Image fill sizes='150px' alt='AirLine' style={{objectFit:"contain",opacity:'30%',objectPosition:'left',}}   src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${props.flight?.airline.iata}`} /> </ListItemIcon>
    <Box display={'flex'} paddingLeft="15%" paddingRight={3} justifyContent="center" alignItems={"center"} textAlign={'center'} flexGrow={3} flexWrap="wrap" height={"100%"}>
    
    <ListItemText sx={{flexGrow:'50%',flexBasis:'50%'}} primaryTypographyProps={{fontWeight:"bold"}} >{props.flight?.origin.iata+' - '+props.flight?.destination.iata}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}} primaryTypographyProps={{fontWeight:"bold"}}>{props.flight?.flightNumber}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}} primaryTypographyProps={{fontWeight:"bold"}}  >{moment(props.flight?.start).format('DD/MM/YYYY')=== moment(props.flight?.end).format('DD/MM/YYYY')?moment(props.flight?.start).format('DD/MM/YYYY'):moment(props.flight?.start).format('DD/MM/YYYY')+'-'+ moment(props.flight?.end).format('DD/MM/YYYY')}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}} primaryTypographyProps={{fontWeight:"bold"}} >{moment(props.flight?.start).format('HH:mm')+'-'+moment(props.flight?.end).format('HH:mm')}</ListItemText>
    </Box>
          </Card>
          </>
  )
}

export default FlightCard