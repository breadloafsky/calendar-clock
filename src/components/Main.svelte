

<script lang="ts">
    import { dateFunctions } from "../utils/dateFunctions";
    import Clock from "./Clock.svelte";
    import Calendar from "./Calendar.svelte";
    import type {DialPos} from "../types";
    
    
    
    let dialPos:DialPos = {
        milliseconds:0,
        seconds:0,
        minutes:0,
        hours:0,
        dayInterval:0,
        daysInWeek:0,
        daysInMonth:0,
        monthsInYear:0,
    }

    function updateCalendar()
    {
        const d = new Date();
        const daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, -1).getDate()+1;
        dialPos.milliseconds = d.getMilliseconds() / 1000;
        dialPos.seconds = (d.getSeconds() + dialPos.milliseconds)/60;
        dialPos.minutes = (d.getMinutes() + dialPos.seconds)/60;
        dialPos.hours =  (d.getHours() + dialPos.minutes)/24;
        dialPos.dayInterval = dialPos.hours;
        dialPos.daysInMonth = (d.getDate()-1 + dialPos.hours)/daysInMonth;
        dialPos.daysInWeek = dialPos.daysInMonth;
        dialPos.monthsInYear = (dateFunctions.dayOfTheYear()+dialPos.hours)/dateFunctions.daysInYear(d.getFullYear());

        Object.entries(dialPos).forEach(([k,p]) =>{
            dialPos[k] =Math.round(800 * (p * 360))/800;
        });
        setTimeout(updateCalendar, 10);
    }
    
    updateCalendar();
    
</script>

<div class="svg-container">
     <svg viewBox="0 0 100 100" class="svg-content" >
     
        <Calendar dialPos={dialPos}/>  
        <Clock dialPos={dialPos}/> 
    </svg> 
    
</div>



<style>
.svg-container {
    width: 100vh;
    height: 100vh;
    overflow: hidden;
}
    
</style>
