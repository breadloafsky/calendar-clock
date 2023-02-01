

<script lang="ts">
    import { dateUtils } from "../utils/dateUtils";
    import Calendar from "./Calendar.svelte";
    import type {DialPos} from "../types";
    import { tweened, spring } from 'svelte/motion';
	import { linear } from 'svelte/easing';
    
    
    
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
    


    let t = 0;

    let progress = tweened(0, {
            duration: 10000,
            easing: linear
	});

    let expandAnim = spring(0, {
        stiffness:0.4,
        damping:0.1,
    });
    

    function updateDateTime()
    {
        const d = new Date();  
        t = d.getMilliseconds();
        t += d.getSeconds() * 1000;
        t += d.getMinutes() * 1000 * 60;
        t += d.getHours() * 1000 * 60 * 60;
        t += (dateUtils.dayOfTheYear()-1) * 1000 * 60 * 60 * 24;
        
        
        progress.update(()=>0,{
            duration: 0,
            easing: linear
	    });
        progress.set(10000);
        setTimeout(updateDateTime, 10000);
    }

    $:
    {
        (()=>{
            
            let dt=t+$progress;
            dt = dt/1000;
            dialPos.seconds = dt%60/60;
            dt = Math.floor(1000*dt/60)/1000;
            dialPos.minutes = dt%60/60;
            dt = Math.floor(1000*dt/60)/1000;
            
            if(dialPos.hours == dt%24/24)
                return;
            dialPos.hours =  dt%24/24;
            dialPos.dayInterval = dialPos.hours;
            dt = Math.floor(1000*dt/24)/1000;
            const d = new Date();   
            const daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, -1).getDate()+1;
            const daysInYear = dateUtils.daysInYear();
            dialPos.monthsInYear = (dt%(daysInYear)/(daysInYear));
            //
            dialPos.daysInMonth = (d.getDate()-1 + dialPos.hours)/daysInMonth;
            dialPos.daysInWeek = dialPos.daysInMonth;
            // 
        })();
        
    }
    
    updateDateTime();
    
</script>

<div class="svg-container">
     <svg viewBox="0 0 80 80" class="svg-content" >
        
        <Calendar dialPos={dialPos} expandAnim={$expandAnim}/>
        <circle 
            r=35 
            fill=transparent 
            transform="translate(40 40)" 
            on:mouseenter={() => expandAnim.set(1)}
            on:mouseleave={() => expandAnim.set(0)}
        />
    
    
    </svg> 
    
</div>



<style>
.svg-container {
    width: 100vh;
    height: 100vh;
    overflow: hidden;
}
    
</style>
