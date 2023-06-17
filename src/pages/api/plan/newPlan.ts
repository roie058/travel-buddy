import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose"
import Plan from "models/Plan";
import {  enumerateDaysBetweenDates } from "@/util/dateHandlers";
import axios from "axios";
import dayjs from 'dayjs'

export interface IPlan{
    
}


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='POST'){
if(!req.body)return res.status(400).json({error:'data is missing'})

const {city,country,type,title,start,end,image,userId,budget,currency}=req.body

const daysArr=enumerateDaysBetweenDates(start,end)

const {data}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city+', '+country }/${dayjs(start).format('YYYY-MM-DD')+'/'+dayjs(end).format('YYYY-MM-DD')}?unitGroup=metric&elements=datetime%2Cname%2Caddress%2Clatitude%2Clongitude%2Ctemp%2Cprecipprob%2Cconditions%2Cdescription%2Cicon&include=days%2Calerts&key=${process.env.WEATHER_KEY}&contentType=json`) 
const weatherData= data.days
const days=daysArr.map((date,i)=>{
const dailyWeather=weatherData[i]
return {
    date,
    rutine:[],
    budget:Number(budget)? Number(budget)/daysArr.length :null,
    weather:dailyWeather.temp?{temp:String(Math.round(dailyWeather.temp)),rainProb:String(dailyWeather.precipprob),weatherType:String(dailyWeather.conditions),icon:String(dailyWeather.icon)}:null
}})


// @ts-ignore
//const userNotGoogle=await User.findOne({userId})

try {

//const DayDocArr=await Day.create({})
// @ts-ignore
    const data=await Plan.create({country:city.length>=1?city+', '+country :country,tags:type,header:title,start,end,image,author:userId,days,budget:{transportation:[],expenses:[],budget,currency},hotels:[],flights:[]}) 

    

         return res.status(201).json({success:true,data})

} catch (error) {
    if(error&&error instanceof mongoose.Error.ValidationError){
         for(let field in error.errors){
         const msg=error.errors[field].message
         return res.status(409).json({error:msg})
         }
}}

}
//}
else{
    res.status(405).json({error:'Method not allowed'})
}

}