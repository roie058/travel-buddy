
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose"
import dbConnect from "../../../../lib/dbConnect";
import Plan from "../../../../models/Plan";

import axios from 'axios';
import moment from 'moment';



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='GET'){
if(!req.query)return res.status(400).json({error:'data is missing'})

const {planId,index,location,locale}=req.query
try {
    // @ts-ignore
    const plan=await Plan.findById(planId)
 const date= moment(new Date(plan.days[Number(index)].date)).format('YYYY-MM-DD');
    
const {data:curWeather}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=metric&elements=datetime%2Ctemp%2Cprecipprob%2Cconditions%2Cicon&include=days%2Ccurrent&key=${process.env.WEATHER_KEY}&lang=${locale}&contentType=json`)
const {data:liveWeather}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cprecipprob%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent&key=${process.env.WEATHER_KEY}&lang=${locale}&contentType=json`)
    
  const weather={temp:String(Math.round(curWeather.days[0].temp)),rainProb:String(curWeather.days[0].precipprob),icon:curWeather.days[0].icon,weatherType:curWeather.days[0].conditions}   
  const weatherLive={temp:String(Math.round(liveWeather.currentConditions.temp)),rainProb:String(liveWeather.currentConditions.precipprob),icon:liveWeather.currentConditions.icon,weatherType:liveWeather.currentConditions.conditions}   
     plan.days[Number(index)].weather=weather
await plan.save()

         return res.status(201).json({success:true,weather,liveWeather:weatherLive})

} catch (error) {
    if(error&& error instanceof mongoose.Error.ValidationError){
         for(let field in error){
         
         const msg=error[field].message
         return res.status(409).json({error:msg})
         }
}else {return res.status(409).json({error: error})}}

}

else{
    res.status(405).json({error:'Method not allowed'})
}

}