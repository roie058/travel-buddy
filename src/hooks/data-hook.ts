import axios from "axios";



export const getPlaceData = async (bounds:{sw:{lat:number,lng:number},ne:{lat:number,lng:number}},type:string)=>{


    try {
       const {data:{data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
        params: {
          bl_latitude:bounds.sw.lat,
          tr_latitude: bounds.ne.lat,
          bl_longitude: bounds.sw.lng,
          tr_longitude: bounds.ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': 'fd4ed84719msh53f53a14ec8af94p16758djsn13642243ed02',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      })
        
return data
    } catch (error) {
        console.log(error);
        
    }
}