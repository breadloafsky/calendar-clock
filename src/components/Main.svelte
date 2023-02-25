

<script lang="ts">
    
    import { dateUtils } from "../utils/dateUtils";
    import Calendar from "./Calendar.svelte";
    import type {DialPos} from "../types";
    import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';
    import { onMount } from "svelte";
    
    
    let initCalendar:() => void;
    let dialPos:DialPos = {
        milliseconds:0,
        seconds:0,
        minutes:0,
        hours:0,
        dayInterval:0,
        daysInWeek:0,
        daysInMonth:0,
        monthsInYear:0,
        year:0,
    }
    


    let t = 0;

    let progress = tweened(0, {
            duration: 1000,
            easing: linear
	});

    let expandAnim = tweened(0, {
        duration: 80,
        easing: linear
    });
    
    function updateDateTime()
    {
        const d = new Date();  
        t = d.getMilliseconds();
        t += d.getSeconds() * 1000;
        t += d.getMinutes() * 1000 * 60;
        t += d.getHours() * 1000 * 60 * 60;
        t += (dateUtils.dayOfTheYear()-1) * 1000 * 60 * 60 * 24;
        progress.update(()=>0, {
            duration: 0,
            easing: linear
	    });
        progress.set(1000);
        setTimeout(updateDateTime, 1000);
    }

    $:{
        (()=>{
            
            let dt=t+$progress;
            dt = dt/1000;
            dialPos.seconds = dt%60/60;
            dt = floor(dt/60);
            dialPos.minutes = dt%60/60;
            dt = floor(dt/60)
            if(dialPos.hours == dt%24/24)
                return; //reduce number of insignificant for slow moving dials

            initCalendar(); // redraw the dials
            dialPos.hours =  dt%24/24;
            dialPos.dayInterval = dialPos.hours;
            dt = floor(dt/24)
            const d = new Date();   
            const daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, -1).getDate()+1;
            const daysInYear = dateUtils.daysInYear();
            dialPos.monthsInYear = (dt%(daysInYear)/(daysInYear));
            dialPos.daysInMonth = (d.getDate()-1 + dialPos.hours)/daysInMonth;
            dialPos.daysInWeek = dialPos.daysInMonth;
            dialPos.year = new Date().getFullYear();
            
        })();
        
    }
    function floor(number){
        return Math.floor(1000*number)/1000;
    }
    

    onMount(async () => {
		updateDateTime();
        initCalendar();
	});
    

</script>

<div class="svg-container">
     <svg viewBox="0 0 80 80" class="svg-content" >
        <g
            on:mousemove={() => expandAnim.set(1)}
            on:mouseleave={() => expandAnim.set(0)}
        >
            <circle 
                r=36 
                fill=transparent 
                transform="translate(40 40)" 
            />
            <Calendar bind:initCalendar={initCalendar} dialPos={dialPos} expandAnim={$expandAnim}/>
        </g>
    </svg> 
</div>



<style>
.svg-container {
    width: 100vh;
    height: 100vh;
    overflow: hidden;
}
    
</style>
