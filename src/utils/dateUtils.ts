


export const dateUtils = {

    daysInMonths:function()
    {
        const days =  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(dateUtils.daysInYear() == 366)
            days[1] = 29;
        return days;
    },
    dayOfTheYear:function(){
        const date = new Date();
        var mn = date.getMonth();
        var dn = date.getDate();
        var dayOfYear = dateUtils.daysInMonths().slice(0,mn).reduce((a, b) => a + b, 0) + dn;
        if(mn > 1 && dateUtils.daysInYear() == 366) dayOfYear++;
        return dayOfYear;
    },
    daysInYear:function (){
        const year = new Date().getFullYear();
        return (((year % 100) != 0 || (year % 400) == 0) && !((year & 3) != 0)) ?  366 : 365;
    },
}; 