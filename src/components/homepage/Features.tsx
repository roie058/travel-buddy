import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { BudgetIcon, EditIcon,  HotelIcon, LikedMarker, ScheduleIcon, WeatherIcon } from '../svgComponents'
import { TFunction } from 'i18next'

type Props = {t: TFunction<"home", undefined, "home">}

const Feature =({children,icon,subText}) => {

    return  <Grid  xs={6} md={3} lg={2}  item>
        <Box padding={'10%'} display={"flex"} flexDirection={"column"} alignItems={"center"}  textAlign={"center"}>
          {icon}
    <Typography pt={"5%"}  fontSize={'2rem'} > {children}</Typography>      
    <Typography pt={"5%"} variant="body1" fontSize={'1rem'} > {subText}</Typography>      
        </Box>
   </Grid>
}

const Features = ({t}: Props) => {
  return (
    <Card>
        <Box display={'flex'} justifyContent={"center"} paddingX={'10%'} paddingY={'3%'} >
<Grid columns={6} container color={"#666666"} >
<Feature subText={t('list.item1.sub')} icon={<ScheduleIcon fill='#666666' width={50} height={50}/>}>{t('list.item1.header')}</Feature>
        <Feature subText={t('list.item2.sub')} icon={<LikedMarker fill='#666666' width={50} height={50}/>} >{t('list.item2.header')}</Feature>
        <Feature subText={t('list.item3.sub')} icon={<HotelIcon fill='#666666' width={50} height={50}/>}>{t('list.item3.header')}</Feature>
        <Feature subText={t('list.item4.sub')} icon={<BudgetIcon fill='#666666' width={50} height={50}/>}>{t('list.item4.header')}</Feature>
        <Feature subText={t('list.item5.sub')} icon={<WeatherIcon fill='#666666' width={50} height={50}/>}>{t('list.item5.header')}</Feature>
        <Feature subText={t('list.item6.sub')} icon={<EditIcon fill='#666666' width={50} height={50}/>}>{t('list.item6.header')}</Feature>  
</Grid>
        
    
     
    </Box>
    </Card>
  )
}

export default Features