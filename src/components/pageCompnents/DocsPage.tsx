import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, CardContent, CardHeader,  List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { Arrow, EditIcon, FlightIcon, HotelIcon, LikedMarker, ScheduleIcon, WeatherIcon } from '../svgComponents'
import Link from 'next/link'
import UiButton from '../ui/buttons/UiButton'
import Image from 'next/image'
import styles from './DocsPage.module.css'
import HeartBtn from '../ui/buttons/HeartBtn'
type Props = {}

const Question=({summary,children,id})=>{

    return  <Accordion id={id}  sx={{width:'100%'}}  >
    <AccordionSummary expandIcon={<Arrow height={30} width={30} />}
  >{summary}</AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
</Accordion>
}


const DocsPage = (props: Props) => {

const isSm=useMediaQuery("(max-width:600px)")

  return (
     <Box height={"100%"} width={"100%"} marginBottom={"10%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
        <Typography className={styles.mainHeader} textAlign={"center"}  fontWeight={"bold"} variant='h1'>How to use Travel buddy?</Typography>
        <List>
            <ListItem>
<Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{textAlign:'center',fontWeight:"bold",className:styles.subHeader}} title={"Create your plan"}/>
    <CardContent>
        <List  >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >1. Navigate to <span ><Link href={'/newplan'} style={{fontWeight:'bold'}}>New Plan</Link></span> page or press the &quot;New plan&quot; button on the profile menu to your top right.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >2. Fill the form with all the relevant data.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}}>3. Submit the form by clicking the {<UiButton style={{height:'30px', width:'100px',padding:"2% 7%",fontSize:'1rem'}} color='blue' clickFn={()=>{}}>Create trip</UiButton>} button.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >4. 🎉You have successfully created your plan!🎉</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >You can view all your plans on <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>Plans</Link></span> page or by clicking &quot;My Trips&quot; on the Navbar</ListItemText></ListItem>
        </List>
    </CardContent>
   </Card>
            </ListItem>
            <ListItem >
            <Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={"Add Places"}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >1. Navigate to the <span ><Link href={'/map'} style={{fontWeight:'bold'}}>Map</Link></span> page or by clicking &quot;Discover Places&quot; on the Navbar.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >2. On the map view the area that you want to search for places.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >3. Click one of the category icons on the top left <ButtonGroup orientation={"horizontal"} >
    <Button  onClick={()=>{}}  sx={{width:'35px',minWidth:'0',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/amusment.gif'}/></Button>
    <Button onClick={()=>{}}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='Hotels' width={20} height={20} src={'/images/bed.png'}/></Button>
    <Button onClick={()=>{}}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='restaurants' width={20} height={20} src={'/images/restaurant.png'}/></Button>
    </ButtonGroup></ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}}>4. Found Places will show as markers on the map </ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >5. When markers are hovered or clicked the place details will appear to add the place click <HeartBtn liked={false} onClick={()=>{}}/></ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >6. In the add menu select the plan that you want to add the place to</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >7. 🎉The place is now added to your plan!🎉</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center"}}  >Added places can be seen on the map as a liked marker <LikedMarker style={{overflow:'clip'}}  width={50} height={50} /></ListItemText></ListItem>
        </List>
    </CardContent>
   </Card>


            </ListItem>
            <ListItem><Card sx={{width:'100%'}}>
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={"Using the Plan Dashboard"}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >The plan dashboard is an overview screen of the plan</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >It contains the plan budget and the following features:</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>1. <ScheduleIcon width={25} height={25}/> Schedule page </ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>Manage the itinerary of the trip plan ahead and create the most efficient route.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>2. <EditIcon width={25} height={25}/> Edit plan</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>Edit the existing plan.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>3. <FlightIcon width={25} height={25}/> Flights page</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>Add your plane tickets it will automatically adds them into the schedule and the budget.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>4. <HotelIcon width={25} height={25}/> Hotels page</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>List of all added hotels, manage bookings and add them into the schedule and budget.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>5. <WeatherIcon width={25} height={25}/> Weather page</ListItemText></ListItem>
      <ListItem > <ListItemText primaryTypographyProps={{className:styles.text,display:'flex',alignItems:"center",gap:'5px'}}>Check the weather anywhere around the globe and plan ahead for possible surprises.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} ></ListItemText></ListItem>
        </List>
    </CardContent>
   </Card></ListItem>
   <ListItem><Card sx={{width:'100%'}}> 
    <CardHeader sx={{paddingTop:'3%'}} titleTypographyProps={{className:styles.subHeader,textAlign:'center',fontWeight:"bold"}} title={"Manage your Schedule"}/>
    <CardContent>
        <List >
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >1. To view the schedule go to your plan page and then press schedule</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >2. The schedule is divided into days inside each day there is a list.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}}>3. Pressing the &quot;add next stop&quot; button will show you all possible attractions and restaurants that you added</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >4. Adding an item will add it to the itinerary of that day.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >5. You can change the order of places by dragging them.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >6. Top right of the day you view the day summary which calculates the daily route by car and show you the current daily budget.</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >7. You can press on the &quot;place info&quot;  button to view the place info</ListItemText></ListItem>
   <ListItem > <ListItemText primaryTypographyProps={{className:styles.text}} >8. In the place info you can set the budget or the type of place (main attraction or a specific meal)</ListItemText></ListItem>
        </List>
    </CardContent>
   </Card></ListItem>
        </List>
<Box display={"flex"} paddingX={"10%"} flexDirection={"column"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>


        <Typography textAlign={"center"} fontSize={isSm?"1.5rem": "2.5rem"} fontWeight={"bold"} variant='h2'>Common questions</Typography>
       <Question id={'question1'} summary={"Where can i see my budget and expenses?"}>The budget management can be seen in the plan dashboard go to <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>My Trips</Link></span>  then select the plan that you want to view the budget will be on the left of the screen</Question>

       <Question id={'question2'} summary={"how to add an expense?"}>expenses can be added manually by pressing the add expense button in the bottom of the budget fill in the title of the expense and amount that spent and the type of expense it will be added to the budget
Other then that your flight tickets and hotel reservation will be added automatically as well if you define a price in a place detail in the schedule page.</Question>
<Question id={'question3'} summary={"how do I add my flight tickets to the schedule?"}>the flight tickets can be added in the <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>Flights page</Link></span> where you can see all your flights and add new ones fill in the flight details and select a flight type Start will attach to the start of the plan end will attach to the end and other will be added to
the specified date.</Question>
<Question id={'question4'} summary={"where can I check the  weather in specific date?"}>the weather is automatically calculated by the First place of each day and can be seen on the top bar of the day and in the day summery in the top part on the left is the expected weather and on the right is the current weather
You can also check the weather for anywhere in the world on the <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>Weather page</Link></span>.</Question>
       <Question id={'question5'} summary={"Where can I see my added locations?"}>All your added locations can be seen in the liked page and on the <span ><Link href={'/plans'} style={{fontWeight:'bold'}}>Map</Link></span>.</Question>
       <Question id={'question6'} summary={"Is there a way to share my plan?"}>currently no, but this feature is on the way.</Question>
       </Box>
    </Box>
  )
}

export default DocsPage