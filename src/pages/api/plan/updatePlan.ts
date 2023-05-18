import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Plan from "models/Plan";
import { enumerateDaysBetweenDates } from "@/util/dateHandlers";
import axios from "axios";
import moment from "moment";
import { Days } from "@/components/pageCompnents/Schedule";

export interface IPlan{
    
}


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='PATCH'){
if(!req.body)return res.status(400).json({error:'data is missing'})

const {data,isDateChange}=req.body
let days=data.days.map((day:any)=>{
return {...day,budget:Number(data.budget)? Math.round(Number(data.budget)/data.days.length) :null}

});

try {
    //const updated=await Plan.findByIdAndUpdate(data._id,{...data,days})
    // @ts-ignore
    const plan=await Plan.findById(data._id)
    if(isDateChange){
const dateArr=new Set(plan.days.map((day:Days)=>day.date))

        const daysArr=enumerateDaysBetweenDates(data.start,data.end)
        const {data:weather}=await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${data.country}/${moment(data.start).format('YYYY-MM-DD')+'/'+moment(data.end).format('YYYY-MM-DD')}?unitGroup=metric&elements=datetime%2Cname%2Caddress%2Clatitude%2Clongitude%2Ctemp%2Cprecipprob%2Cconditions%2Cdescription%2Cicon&include=days%2Calerts&key=${process.env.WEATHER_KEY}&contentType=json`) 
        const weatherData= weather.days
         days=daysArr.map((date,i)=>{
            const dailyWeather=weatherData[i]

            if(dateArr.has(date)){
return {...plan.days.find((day:Days)=>day.date===date),weather:dailyWeather.temp?{temp:String(Math.round(dailyWeather.temp)),rainProb:String(dailyWeather.precipprob),weatherType:String(dailyWeather.conditions),icon:String(dailyWeather.icon)}:null, budget:Number(data.budget)? Math.round(Number(data.budget)/daysArr.length) :null,}
            }
            
        return {
            date,
            rutine:[],
            budget:Number(data.budget)? Math.round(Number(data.budget)/daysArr.length) :null,
            weather:dailyWeather.temp?{temp:String(Math.round(dailyWeather.temp)),rainProb:String(dailyWeather.precipprob),weatherType:String(dailyWeather.conditions),icon:String(dailyWeather.icon)}:null
        }})
    }


plan.days=days;
plan.budget.budget=data.budget;
plan.budget.currency=data.currency
plan.header=data.header;
plan.image=data.image;
plan.country=data.country;
plan.start=data.start;
plan.end=data.end;
plan.save()


         return res.status(201).json({success:true,plan})

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