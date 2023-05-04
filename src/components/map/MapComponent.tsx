
import { MapContext } from '@/context/map-context'
import React, {  useContext, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import useSupercluster from '../../hooks/useCluster'
import { IPlace } from '@/dummyData'
import Marker, { ClusterMarker } from './Marker'
import Supercluster from 'supercluster'
import { GeoJsonProperties,BBox } from "geojson";
type Props = {likedMarkers?:IPlace[]|[]}





const MapComponent = (props: Props) => {
   const [zoom,setZoom]=useState<number>(14)
   const [bounds,setBounds]=useState<BBox>()
    const mapRef=useRef<any>()
    const mapCtx = useContext(MapContext)


    const markerClick=(i:number,lat:number,lng:number)=>{
        mapCtx?.setChildClicked(i)
        mapRef?.current.setZoom(17);
        mapRef.current.panTo({lat,lng});
     }





    const likedPoints:Array<Supercluster.PointFeature<GeoJsonProperties>>=[...props.likedMarkers,...mapCtx.placeList].map((point:IPlace)=>{
return{ 
   type: "Feature",
   properties: {
     cluster: false,
     placeId: point?._id??point.location_id,
     place:point ,
     liked:point._id?true:false
   },
   geometry: { type: "Point", coordinates: [Number(point.longitude),Number(point.latitude)] }
 }})
const {clusters,supercluster}=useSupercluster({
points:likedPoints,
bounds:bounds,
zoom:zoom,
options:{radius:75,maxZoom:20}
})




  return (
    <>
 
        <GoogleMapReact
        onChange={(e)=>{
        mapCtx?.setCoordinates({lat:e.center.lat,lng:e.center.lng});
       mapCtx?.setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
       setBounds([e.bounds.nw.lng,e.bounds.se.lat,e.bounds.se.lng,e.bounds.nw.lat])
        setZoom(e.zoom);
         
       }} 
       onGoogleApiLoaded={({map})=>{
mapRef.current=map;
mapCtx.mapRef.current=map;
       }}
        center={mapCtx?.coordinates}
        bootstrapURLKeys={{key:`${process.env.MAPS_API_KEY}`}}
          defaultZoom={14}
       
       yesIWantToUseGoogleMapApiInternals
        >
         {clusters.map((cluster,i)=>{
const [longitude,latitude]=cluster.geometry.coordinates;
const {cluster:isCluster,point_count:pointCount}=cluster.properties;
if(isCluster){
return <ClusterMarker  length={clusters.length} pointCount={pointCount} key={i+String(cluster?.id)} lat={latitude} lng={longitude} onClick={()=>{
   const expantionZoom=Math.min(supercluster.getClusterExpansionZoom(Number(cluster?.id)), 20) 

   mapRef?.current.setZoom(expantionZoom);
   mapRef.current.panTo({lat:latitude,lng:longitude});
}}>
   <div >{pointCount}</div>
   
   </ClusterMarker>
}

return <Marker onClick={markerClick} liked={cluster.properties.liked} place={cluster?.properties?.place} key={i+cluster?.properties?.placeId} lat={Number(latitude)} lng={Number(longitude)}/>

         })}

        </GoogleMapReact>
    
     </>
  )
}


export default MapComponent