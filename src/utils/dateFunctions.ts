export function daysInYear(year:number){
    return (((year % 100) != 0 || (year % 400) == 0) && !((year & 3) != 0)) ?  366 : 365;
}

export const dateFunctions = {
    dayOfTheYear:function(){
        const date = new Date();
        var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var mn = date.getMonth();
        var dn = date.getDate();
        var dayOfYear = dayCount[mn] + dn;
        if(mn > 1 && daysInYear(date.getFullYear()) == 366) dayOfYear++;
        return dayOfYear
    },
    daysInYear:function (year:number){
        return daysInYear(year);
    }
}; 
