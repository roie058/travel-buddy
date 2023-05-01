
import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from "../../../../lib/dbConnect";
import axios from 'axios';
import moment from 'moment';



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='GET'){
if(!req.query)return res.status(400).json({error:'data is missing'})

const {location,start,end}=req.query
try {
    // @ts-ignore

 const startDate= moment(new Date(String(start))).format('YYYY-MM-DD');
 const endDate= moment(new Date(String(end))).format('YYYY-MM-DD');
    
const {data:curWeather}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&key=${process.env.WEATHER_KEY}&contentType=json`)
const {data:liveWeather}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cprecipprob%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent&key=${process.env.WEATHER_KEY}&contentType=json`)
    
//const weather=curWeather.days.map((weather)=>{return {temp:String(Math.round(weather.temp)),rainProb:String(weather.precipprob),icon:weather.icon,weatherType:weather.conditions}})
  const weatherLive={temp:String(Math.round(liveWeather.currentConditions.temp)),rainProb:String(liveWeather.currentConditions.precipprob),icon:liveWeather.currentConditions.icon,weatherType:liveWeather.currentConditions.conditions}   

         return res.status(201).json({success:true,weather:curWeather.days,liveWeather:weatherLive})

} catch (error) {
  
    return res.status(409).json({error: error})}
}else{
    res.status(405).json({error:'Method not allowed'})
}

}