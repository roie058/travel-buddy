
import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from "../../../../lib/dbConnect";
import axios from 'axios';
import dayjs from 'dayjs'


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='GET'){
if(!req.query)return res.status(400).json({error:'data is missing'})

const {location,start,end,locale}=req.query
try {


 const startDate= dayjs(new Date(String(start))).format('YYYY-MM-DD');
 const endDate= dayjs(new Date(String(end))).format('YYYY-MM-DD');
    
const {data:curWeather}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&key=${process.env.WEATHER_KEY}&lang=${locale}&contentType=json`)
    

         return res.status(201).json({success:true,weather:curWeather.days})

} catch (error) {
  
    return res.status(409).json({error: error})}
}else{
    res.status(405).json({error:'Method not allowed'})
}

}