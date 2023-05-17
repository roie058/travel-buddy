
export type IPlace= {
    likedId?:string[],
address:string
,address_obj:{street1: string, street2: string|null, city: string, state: string|null, country: string}
,ancestors:any[]
,awards:any[]
,bearing:string
,booking:{provider: string, url: string}
,category:{key: 'hotel'|'attraction'|'restaurant', name: string}
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
