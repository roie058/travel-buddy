
import { MapContext } from '@/context/map-context'
import React, { ReactElement, useContext, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'
type Props = {likedMarkers?:any[],placesMarkers?:ReactElement[]}

const MapComponent = (props: Props) => {
   const [zoom,setZoom]=useState<number>(14)
    const mapRef=useRef()
    const mapCtx = useContext(MapContext)
    const childClick=(child:any)=>{
        mapCtx?.setChildClicked(child)
     }
  return (
    <>
 
        <GoogleMapReact
        onChange={(e)=>{
        mapCtx?.setCoordinates({lat:e.center.lat,lng:e.center.lng});
       mapCtx?.setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
        setZoom(e.zoom);
         
       }} 
       onGoogleApiLoaded={({map})=>{
mapRef.current=map
       }}
      onChildClick={childClick}
        center={mapCtx?.coordinates}
        bootstrapURLKeys={{key:`${process.env.MAPS_API_KEY}`}}
          defaultZoom={14}
       
       yesIWantToUseGoogleMapApiInternals
        >
{props.likedMarkers&& props.likedMarkers.map((marker)=>marker)}
{props.placesMarkers&& props.placesMarkers.map((marker)=>marker)}

        </GoogleMapReact>
    
     </>
  )
}


export default MapComponent