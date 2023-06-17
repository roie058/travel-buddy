
import dayjs from 'dayjs'

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

for(let i=0;i<=daysNum; i++){
dateArray.push( addDays(startDate,i))
}



}

export const  enumerateDaysBetweenDates = function(startDate:Date, endDate:Date) {
    const currDate = dayjs(startDate).startOf('day');
    const lastDate = dayjs(endDate).startOf('day');
    
   
    
    let dates = [currDate.clone().format('MM/DD/YYYY')]
   
    let count=1;
    while( currDate.add(count, "day").diff(lastDate,'day') <= 0) {
        dates.push(currDate.add(count, "day").clone().format('MM/DD/YYYY'));
        count++;
        
    }
    return dates;
};


