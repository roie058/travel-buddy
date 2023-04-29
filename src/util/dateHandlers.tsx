import Day from "models/Day";
import moment from "moment";


const addDays = function(date:Date,days:number) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    const formatedDate= newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate()
    return formatedDate;
}


export const createDateArray=(start:Date,end:Date)=>{
    
   let dateArray=[];
const startDate=new Date(start)
const endDate=new Date(end)

const daysNum=(endDate.getTime()-startDate.getTime())/86400000;
console.log({end,start,daysNum});

for(let i=0;i<=daysNum; i++){
dateArray.push( addDays(startDate,i))
}



}

export const  enumerateDaysBetweenDates = function(startDate:Date, endDate:Date) {
    const currDate = moment(startDate).startOf('day');
    const lastDate = moment(endDate);
    
   
    
    let dates = [currDate.clone().format('MM/DD/YYYY')]
    while(currDate.add(1, 'days').diff(lastDate) < 0) {
       
        dates.push(currDate.clone().format('MM/DD/YYYY'));
    }
//dates.push(lastDate.format('MM/DD/YYYY'))
    return dates;
};


