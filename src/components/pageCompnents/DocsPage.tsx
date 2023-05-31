import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, CardContent, CardHeader,  List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { Arrow, EditIcon, FlightIcon, HotelIcon, LikedMarker, ScheduleIcon, WeatherIcon } from '../svgComponents'
import Link from 'next/link'
import UiButton from '../ui/buttons/UiButton'
import Image from 'next/image'
import styles from './DocsPage.module.css'
import HeartBtn from '../ui/buttons/HeartBtn'

import { useTranslation } from 'next-i18next'
type Props = { }

const Question=({summary,children,id})=>{

    return  <Accordion id={id}  sx={{width:'100%'}}  >
    <AccordionSummary expandIcon={<Arrow height={30} width={30} />}
  >{summary}</AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
</Accordion>
}


const DocsPage = (props: Props) => {
    const { t } = useTranslation('docs')
const isSm=useMediaQuery("(max-width:600px)")

  return (
     <Box height={"100%"} width={"100%"} marginBottom={"10%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
        <Typography className={styles.mainHeader} textAlign={"center"}  fontWeight={"bold"} variant='h1'>{t("title")}</Typography>
        <List>
            <ListItem>
<Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{textAlign:'center',fontWeight:"bold",className:styles.subHeader}} title={t("guide1.title")}/>
    <CardContent>
        <List  >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >1. {t("guide1.step1")}<span ><Link href={'/newplan'} style={{fontWeight:'bold'}}> {t("guide1.link1")}</Link></span> {t("guide1.step1rest")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >2. {t("guide1.step2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}}>3. {t("guide1.step3")} {<UiButton style={{height:'30px', width:'100px',padding:"2% 7%",fontSize:'1rem'}} color='blue' clickFn={()=>{}}>{t("guide1.step3button")}</UiButton>} {t("guide1.step3rest")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >4.🎉{t("guide1.step4")}🎉</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} > {t("guide1.summery")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("guide1.summeryLink")}</Link></span> {t("guide1.summeryRest")}</ListItemText></ListItem>
        </List>
    </CardContent>
   </Card>
            </ListItem>
            <ListItem >
            <Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={t("guide2.title")}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >1. {t("guide2.step1")} <span ><Link href={'/map'} style={{fontWeight:'bold'}}>{t("guide2.link1")}</Link></span> {t("guide2.step1rest")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >2. {t("guide2.step2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >3. {t("guide2.step3")} <ButtonGroup orientation={"horizontal"} >
    <Button  onClick={()=>{}}  sx={{width:'35px',minWidth:'0',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/amusment.gif'}/></Button>
    <Button onClick={()=>{}}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='Hotels' width={20} height={20} src={'/images/bed.png'}/></Button>
    <Button onClick={()=>{}}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='restaurants' width={20} height={20} src={'/images/restaurant.png'}/></Button>
    </ButtonGroup></ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}}>4. {t("guide2.step4")} </ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >5. {t("guide2.step5")} <HeartBtn liked={false} onClick={()=>{}}/></ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >6. {t("guide2.step6")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >7. 🎉{t("guide2.step7")}🎉</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center"}}  >{t("guide2.summery")} <LikedMarker style={{overflow:'clip'}}  width={50} height={50} /></ListItemText></ListItem>
        </List>
    </CardContent>
   </Card>


            </ListItem>
            <ListItem><Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={t("guide3.title")}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >{t("guide3.row1")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >{t("guide3.row2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>1. <ScheduleIcon width={25} height={25}/> {t("guide3.step1")} </ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>{t("guide3.step1text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>2. <EditIcon width={25} height={25}/> {t("guide3.step2")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>{t("guide3.step2text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>3. <FlightIcon width={25} height={25}/> {t("guide3.step3")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>{t("guide3.step3text")}.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>4. <HotelIcon width={25} height={25}/> {t("guide3.step4")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>{t("guide3.step4text")}.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>5. <WeatherIcon width={25} height={25}/> {t("guide3.step5")}</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>{t("guide3.step5text")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} ></ListItemText></ListItem>
        </List>
    </CardContent>
   </Card></ListItem>
   <ListItem><Card sx={{width:'100%'}}> 
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={t("guide4.title")}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >1. {t("guide4.step1")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >2. {t("guide4.step2")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}}>3. {t("guide4.step3")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >4. {t("guide4.step4")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >5. {t("guide4.step5")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >6. {t("guide4.step6")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >7. {t("guide4.step7")}</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >8. {t("guide4.step8")}</ListItemText></ListItem>
        </List>
    </CardContent>
   </Card></ListItem>
        </List>
<Box display={"flex"} paddingX={"10%"} flexDirection={"column"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>


        <Typography textAlign={"center"} fontSize={isSm?"1.5rem": "2.5rem"} fontWeight={"bold"} variant='h2'>{t("qa.header")}</Typography>
       <Question id={'question1'} summary={t("qa.q1")}>{t("qa.a1")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a1link")}</Link></span>  {t("qa.a1rest")}</Question>

       <Question id={'question2'} summary={t("qa.q2")}>{t("qa.a2")}</Question>
<Question id={'question3'} summary={t("qa.q3")}>{t("qa.a3")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a3link")}</Link></span> {t("qa.a3rest")}</Question>
<Question id={'question4'} summary={t("qa.q4")}>{t("qa.a4")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a4link")}</Link></span>.</Question>
       <Question id={'question5'} summary={t("qa.q5")}>{t("qa.a5")} <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>{t("qa.a5link")}</Link></span>.</Question>
       <Question id={'question6'} summary={t("qa.q6")}>{t("qa.a6")}</Question>
       </Box>
    </Box>
  )
}

export default DocsPage