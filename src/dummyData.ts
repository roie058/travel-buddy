import { PlaceList } from "@/components/ui/list/List";
import { Plan } from "@/pages/plans/[planId]/schedule";

export const planItaly:Plan={
    id:'italy',headImg:'/images/italy.jpg',country:'Italy',dates:'23/02/2023-25/02/2023',
days:{
    
    '2023-02-23': {
    date:'2023-02-23',
    morning:[],
    afternoon:[],
    night:[],
    },
    
    '2023-02-24': {
      date:'2023-02-24',
      morning:[],
      afternoon:[],
      night:[],
      },
      
      '2023-02-25': {
        date:'2023-02-25',
        morning:[],
        afternoon:[],
        night:[],
        }
    
    },
        tags:[{tag:'Hiking',color:'#FFB74A'},{tag:'Food',color:'#52FEF4'},{tag:'Shopping',color:'#6900D1'}],
        liked:{restaurants:[],hotels:[],attractions:[]},
}


export const planSwiss:Plan={
    id:'switzarland',headImg:'/images/swiss.jpg',country:'Swizarland',dates:'24/02/2023-26/02/2023',
days:{
    '2023-02-24':{
    date:'2023-02-24',
    morning:[],
    afternoon:[],
    night:[],
    },
    '2023-02-25':{
      date:'2023-02-25',
      morning:[],
      afternoon:[],
      night:[],
      },
      '2023-02-26':{
        date:'2023-02-26',
        morning:[],
        afternoon:[],
        night:[],
        },
        '2023-02-27':{
            date:'2023-02-27',
            morning:[],
            afternoon:[],
            night:[],
            }
    
    
    },
        tags:[{tag:'Hiking',color:'#FFB74A'},{tag:'Food',color:'#52FEF4'},{tag:'Ski',color:'#6900D1'}],
        liked:{restaurants:[],hotels:[],attractions:[]},
}



export const places:PlaceList={
    attractions:[{ 
        id:'The Colloseum',
        liked:false,
        location:'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
        category:"attraction",
        headImg:"/images/colloseum.jpg",
        name:"The Colloseum",
        stars:"4.8",
        reviews:'350'},
        { 
            id:'Trevi Fountain',
            liked:false,
            location:'Trevi Fountain, 1, 00184 Roma RM, Italy',
            category:"attraction",
            headImg:"/images/fountain.jpg",
            name:"Trevi Fountain",
            stars:"4.6",
            reviews:'227'}]
    ,hotels:[
        {
            liked:false,
        id:'River Hotel',
        category:'5 star hotel',
         name:'River Hotel',
          location:'Via Cavour, 254, 00184 Roma RM, Italy',
          headImg:'/images/hotel.jpg',
          stars:'4.9',
          reviews:'23'
        }]
    ,restaurants:[
    {  
    id:'BBB',
liked:false,
location:'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
category:"Burger restaurant",
headImg:"/images/bbb.jpg",
name:"BBB",
stars:"4.0",
reviews:'9'
}
]
}



export type IPlace= {
address:string
,address_obj:{street1: string, street2: string|null, city: string, state: string|null, country: string}
,ancestors:any[]
,awards:any[]
,bearing:string
,booking:{provider: string, url: string}
,category:{key: string, name: string}
,cuisine: any[]
,description:string
,dietary_restrictions:any[]
,distance:string
,distance_string:string
,doubleclick_zone:string
,email:string
,establishment_types:any[]
,hours:{week_ranges: any[], timezone: string}
,is_candidate_for_contact_info_suppression:boolean
,is_closed:boolean
,is_jfy_enabled:boolean
,is_long_closed:boolean
,latitude:string
,location_id:string
,location_string:string
,longitude:string
,name:string
,nearest_metro_station:any[]
,neighborhood_info:any[]
,num_reviews:string
,open_now_text:string
,parent_display_name:string
,phone:string
,photo:{images: any, is_blessed: boolean, uploaded_date: string, caption: string, id: string}
,preferred_map_engine:string
,price_level:string
,ranking:string
,ranking_category:string
,ranking_denominator:string
,ranking_geo:string
,ranking_geo_id:string
,ranking_position:string
,rating:string
,raw_ranking:string
,reserve_info:{id: string, provider: string, provider_img: string, booking_partner_id: string|null}
,subcategory:any[]
,timezone:string
,web_url:string
website:string,
_id?:string,
business_listings?:{mobile_contacts:[{value:string,label:string,type:string}],desktop_contacts:[{value:string,label:string,type:string}]}
,price:string
}
