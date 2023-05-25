export function getDistanceFromLatLonInKm(location1:{latitude:number,longitude:number},location2:{latitude:number,longitude:number}) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(location2.latitude-location1.latitude);  // deg2rad below
    const dLon = deg2rad(location2.longitude-location1.longitude); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(location1.latitude)) * Math.cos(deg2rad(location2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }