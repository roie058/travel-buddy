import { Flight } from "@/components/flights/AddFlightModal"
import { Plan } from "@/components/pageCompnents/Schedule"
import { RoutineItem } from "@/components/ui/calender/DayList"
import { IPlace } from "@/dummyData"
import { NewSesstion } from "@/pages/api/auth/signup"
import axios from "axios"
import { FieldValues } from "react-hook-form"


//plans fns
export const getPlans=(newSession,populate:boolean=false)=>axios.get('/api/plan/getPlans',{params:{userId:newSession?.user?.id,populate:populate}}).then((value)=>value.data.plans)

//plan fns
export const getPlanById =(newSession:NewSesstion,planId:string)=> axios.get('/api/plan/getPlan',{params:{userId:newSession.user?.id,planId}}).then((value)=>value.data.plan)
export const deleteHandler=(id:string)=>axios.delete(`/api/plan/deletePlan`,{params:{planId:id}}).then((value)=>value.data.plans)
export const postNewPlan=(data:FieldValues)=>axios.post(`/api/plan/newPlan`,data)
export const editPlan=({data,isDateChange}:{data:FieldValues,isDateChange:boolean})=>axios.patch('/api/plan/updatePlan',{data,isDateChange}) 

//budget fns
export const addExpense=({data,planId}:{data:FieldValues,planId:string})=>axios.patch('/api/budget/addBudget',{planId,data}) 
export const deleteExpense=({planId,expenseId,expenseType}:{planId:string,expenseId:string,expenseType:string})=>axios.delete('/api/budget/deleteBudget',{params:{planId,expenseId,expenseType}})

//rutine fns
export const listChange=(plan:Plan)=>axios.patch('/api/plan/daysChange',{plan})
export const listAdd=({listItem,index,planId}:{listItem:RoutineItem,index:number,planId:string})=>axios.patch('/api/plan/days',{listItem,index,planId})
export const listRemove=({dragId,index,planId,placeId}:{dragId:string,index:number,planId:string,placeId:string})=>axios.delete('/api/plan/days',{params:{dragId,index,planId,placeId}})

export function isPlace(selected: IPlace|Flight['destination']): selected is IPlace {
    return (selected as IPlace).latitude !== undefined;
  }
  
export const getWeather =({locale,planId,index,rutine,start}:{locale:string,planId:string,index:number,rutine:RoutineItem[],start:IPlace|Flight['destination']})=>{
    if(start&& isPlace(start) ){
          return axios.get("/api/weather/getWeather",{params:{locale,planId,index,location:`${start.latitude},${start.longitude}`}}).then((value)=>value.data)
        }else if(start&& !isPlace(start)){
        return   axios.get("/api/weather/getWeather",{params:{locale,planId,index,location:`${start.lat},${start.lng}`}}).then((value)=>value.data)
        }else if(rutine.length>0){
       return axios.get("/api/weather/getWeather",{params:{locale,planId,index,location:`${rutine[0].place.latitude},${rutine[0].place.longitude}`}}).then((value)=>value.data)
        }else {return}
}

//place fns
export const editPlace=({ position,planId,index,place,budget,dragId,description}:{ position:string,planId:string,index:number,place:IPlace,budget:number,dragId:string,description:string
 })=>axios.patch('/api/place/editPlace',{position,planId,index,place, budget,dragId,description})
//new place no plan
 export const newPlace=(place:FieldValues)=>axios.post('/api/place/newPlace',{place}).then((value)=>value.data)

 export const newLikedPlace=({place,planId,category}:{place:IPlace,category:string,planId:string})=>axios.post('/api/place/newPlace',{place,category,planId})

export const removePlace=({place,category,planId}:{place:IPlace,category:string,planId:string})=>axios.patch('/api/place/newPlace',{place,category,planId})

//flights fns 
 export const deleteFlight=({planId,flightId}:{planId:string,flightId:string,planIndex:number,index:number})=>axios.delete('/api/flight/deleteFlight',{params:{planId,flightId}})
 export const addNewFlight=({planId,flight}:{flight:Flight,planId:string})=>axios.patch('/api/flight/newFlight',{flight,planId})
 export const editFlight=({planId,flight,flightId}:{flight:FieldValues,planId:string,flightId:string})=>axios.patch('/api/flight/editFlight',{flight,planId,flightId})
//hotels fns
export const addReservation=({planId,data}:{data:FieldValues,planId:string})=>axios.patch('/api/hotel/addReservation',{planId,data})
export const deleteReservation=({planId,hotelId}:{planId:string,hotelId:string,index:number})=>axios.delete('/api/hotel/deleteReservation',{params:{planId,hotelId}})
export const editReservation=({data,planId,hotelId}:{data:FieldValues,planId:string,hotelId:string})=>axios.patch('/api/hotel/editHotel',{data,planId,hotelId})
//weather fns
export const getWeatherByDates=({locale,start,end,location}:{locale:string,start:Date,end:Date,location:string})=>axios.get("/api/weather/getWeatherByDates",{params:{start,end,location,locale}}).then((value)=>value.data.weather)