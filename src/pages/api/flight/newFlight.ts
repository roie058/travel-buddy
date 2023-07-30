import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Plan from "models/Plan";

import axios from "axios";
import { Result } from "@/components/flights/FlightResult";
import { Flight } from "@/components/flights/AddFlightModal";




export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='PATCH'){
if(!req.body)return res.status(400).json({error:'data is missing'})

const {flight,planId}:{flight:Result|Flight,planId:string}=req.body

try {
        // @ts-ignore
const plan=await Plan.findById(planId)
 function isResult(selected: Result|Flight): selected is Result {
    return (selected as Result).baglimit !== undefined;
  }
    if(isResult(flight)){
    const returnRoute=flight.route.filter((flight)=>flight.return===1)
const startRoute=flight.route.filter((flight)=>flight.return===0)
const startLocation= await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:flight.flyFrom,location_types:"airport",locale:"en-US"}}).then((value)=>value.data.locations.find((location)=>location.id===flight.flyFrom))
const endLocation= await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:flight.flyTo,location_types:"airport",locale:"en-US"}}).then((value)=>value.data.locations.find((location)=>location.id===flight.flyTo))

const startFlight:Flight={
    booked:false,
    addedMethod:"kiwi",
    flightId:flight.id,
    bookLink:flight.deep_link,
    price:returnRoute.length>0? flight.price/2: flight.price,
    arrival:flight.local_arrival,
    departure:flight.local_departure,
    airline:startRoute.map((routeObj)=>routeObj.airline),
    stops:startRoute.length>1? startRoute.length-1 :"direct",
    origin:{lat:startLocation.location.lat,lng:startLocation.location.lon, iata:flight.flyFrom,name:flight.cityFrom},
    destination:{lat:endLocation.location.lat,lng:endLocation.location.lon,iata:flight.flyTo ,name:flight.cityTo},
    position:returnRoute.length>0? "start": "other",
    flightNumber:startRoute.map((routeObj)=>routeObj.airline+" "+routeObj.flight_no),
    flightDetails:startRoute
}

let returnFlight:Flight
if(returnRoute.length>0){
    const returnStartLocation= await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:returnRoute[0].flyFrom,location_types:"airport",locale:"en-US"}}).then((value)=>value.data.locations.find((location)=>location.id===returnRoute[0].flyFrom))
const returnEndLocation= await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:returnRoute[returnRoute.length-1].flyTo,location_types:"airport",locale:"en-US"}}).then((value)=>value.data.locations.find((location)=>location.id===returnRoute[returnRoute.length-1].flyTo))
    returnFlight={
        booked:false,
        addedMethod:"kiwi",
        price:flight.price/2,
        flightId:flight.id,
        bookLink:flight.deep_link,
        arrival:returnRoute[returnRoute.length-1].local_arrival,
        departure:returnRoute[0].local_departure,
        airline:returnRoute.map((routeObj)=>routeObj.airline),
        stops:returnRoute.length>1? returnRoute.length-1 :"direct",
        origin:{lat:returnStartLocation.location.lat,lng:returnStartLocation.location.lon ,iata:returnRoute[0].flyFrom,name:returnRoute[0].cityFrom},
        destination:{lat:returnEndLocation.location.lat,lng:returnEndLocation.location.lon ,iata:returnRoute[returnRoute.length-1].flyTo,name:returnRoute[returnRoute.length-1].cityTo},
        position:"end",
        flightNumber:returnRoute.map((routeObj)=>routeObj.airline+" "+routeObj.flight_no),
        flightDetails:returnRoute
    }
}

plan.flights.push(startFlight)
if(returnFlight){
    plan.flights.push(returnFlight)
}
    }else{
        plan.flights.push({...flight,addedMethod:"manual",stops:Number(flight.stops)<= 0? "direct" :flight.stops});
    }


 await plan.save()

         return res.status(201).json({success:true,flight:plan.flights[plan.flights.length-1]})

} catch (error) {
    if(error&&error instanceof mongoose.Error.ValidationError){
         for(let field in error.errors){
         const msg=error.errors[field].message
         return res.status(409).json({error:msg})
         }
        
}else{
    return res.status(409).json({error})
 }

}

}
//}
else{
    res.status(405).json({error:'Method not allowed'})
}

}