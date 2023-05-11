import { Box, Card, CardContent, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { AddedIcon, BudgetIcon, EditIcon, HeartIcon, HotelIcon, LikedIcon, LikedMarker, ScheduleIcon, WeatherIcon } from '../svgComponents'


type Props = {}

const Feature =({children,icon,subText}) => {

    return  <Grid  xs={6} md={3} lg={2}  item>
        <Box padding={'10%'} display={"flex"} flexDirection={"column"} alignItems={"center"}  textAlign={"center"}>
          {icon}
    <Typography pt={"5%"} variant="h3" fontSize={'2rem'} > {children}</Typography>      
    <Typography pt={"5%"} variant="body1" fontSize={'1rem'} > {subText}</Typography>      
        </Box>
   </Grid>
}

const Features = (props: Props) => {
  return (
    <Card>
        <Box display={'flex'} justifyContent={"center"} paddingX={'10%'} paddingY={'3%'} >
<Grid columns={6} container color={"#666666"} >
<Feature subText={"control over your itinerary"} icon={<ScheduleIcon fill='#666666' width={50} height={50}/>}> Create your Schedule</Feature>
        <Feature subText={"on an interactive map check what's around you"} icon={<LikedMarker fill='#666666' width={50} height={50}/>} >  Add Attractions Restaurants and Hotels</Feature>
        <Feature subText={"track over all your booked flights and accommodations"} icon={<HotelIcon fill='#666666' width={50} height={50}/>}>  Add your hotel reservations and flights</Feature>
        <Feature subText={"calculate expenses on transportation and on other expenses"} icon={<BudgetIcon fill='#666666' width={50} height={50}/>}> Manage your budget</Feature>
        <Feature subText={"check the wheather anywhere anytime"} icon={<WeatherIcon fill='#666666' width={50} height={50}/>}>  Check the weather conditions</Feature>
        <Feature subText={"customize your own plan with all the details"} icon={<EditIcon fill='#666666' width={50} height={50}/>}>  Create the plan that fits you</Feature>  
</Grid>
        
    
     
    </Box>
    </Card>
  )
}

export default Features