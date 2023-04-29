
import { Place } from "@/dummyData";
import { createContext, Dispatch, SetStateAction } from "react";

type MapContextType={
    coordinates:{lat:number,lng:number}|undefined,
    setCoordinates:Dispatch<SetStateAction<{ lat: number; lng: number; } | undefined>>,
    bounds: any,
    setBounds:Dispatch<SetStateAction<any>>,
    childClicked:any,
    setChildClicked:Dispatch<SetStateAction<any>>,
    isLoading:boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
placeList:Place[]|any[],
setPlaceList:Dispatch<SetStateAction<Place[]|any[]>>,
type:'hotels'|'restaurants'|'attractions',
setType:Dispatch<SetStateAction<'hotels'|'restaurants'|'attractions'>>,
rating:string,
setRating:Dispatch<SetStateAction<string>>
} 

export  const MapContext= createContext<MapContextType|null>(null)

 