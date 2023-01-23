

<script lang="ts">
    import { object_without_properties } from "svelte/internal";
    import { svgFunctions } from "../utils/svgFunctions";
    import Section from "./Section.svelte";
    
    let dials : { [key: string]: Dial } = {};

    interface Section{
        name:string; //  the visible label of the section
        start:number;       //  the start angle of the section
        end:number;         //  the end angle of the section
        color:string;
        id:number;
    }

    interface Dial {
        name:string;    //  the name of the dial
        color?:string;
        r1:number;
        r2:number;
        total:number;
        sections:Section[];
        fontSize:number;
        hideProgress:boolean;  // hide progress color
        spiralCoeff?:number;
    };




    //  initialize dials
    function initTime(){
        let time : { [key: string]: Dial } = {};
        time.seconds = <Dial>{
            name:"seconds",
            r1:15,
            r2:18,
            total:60,
            color:"lightsteelblue",
            fontSize:7,
        };
        time.minutes = <Dial>{
            name:"minutes",
            r1:18,
            r2:21,
            total:60,
            color:"cornflowerblue",
            fontSize:8,
        };
        time.hours = <Dial>{
            name:"hours",
            r1:21,
            r2:24,
            total:24,
            color:"dodgerblue",
            fontSize:10,
        };
        
        Object.entries<Dial>(time).forEach( ([k, d] ) => {
            let offset = 0;
            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let section = <Section>{
                    name: a+1+"",
                    start: ((offset)/d.total) * 360,
                    end: ((step+offset)/d.total) * 360,
                    color:d.color,
                    id:i,
                };
                offset += step;
                return section;
            });
        });
        dials = {...dials, ...time};
    }

    function daysInYear(year:number){
        return (((year % 100) != 0 || (year % 400) == 0) && !((year & 3) != 0)) ?  366 : 365;
    }
    function dayOfTheYear(){
        const date = new Date();
        var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var mn = date.getMonth();
        var dn = date.getDate();
        var dayOfYear = dayCount[mn] + dn;
        if(mn > 1 && daysInYear(date.getFullYear()) == 366) dayOfYear++;
        return dayOfYear;
    }

    function initDays() {
        

        const date = new Date(new Date().getFullYear(), 0, 1);
        //new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        let days : { [key: string]: Dial } = {};
        days.daysInYear = <Dial>{
            name:"daysInYear",
            r1:24,
            r2:40,
            total: 378,
            color:"orange",
            spiralCoeff:9,
            fontSize:10,
            //hideProgress:true,//remove later
        };
        days.daysInWeek = <Dial>{
            name:"daysInWeek",
            r1:24,
            r2:27,
            total: 42,
            color:"darkgray",
            fontSize:10,
            hideProgress:true,
        }; 

        
     
        Object.entries<Dial>(days).forEach( ([k, d] ) => {
            let offset = 0;

            date.setDate(date.getDate()  - Math.round(days.daysInYear.total/2));
            
            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let name = a+1+"";
                let color = d.color;

                if(k == "daysInWeek")
                    name = ["Mo","Tu","We","Th","Fr","Sa","Su"][(offset+6)%7];
                else
                {
                    name = date.getDate()+"";
                    
                    color =  ["orange","yellow"][date.getMonth()%2];//`hsl(${(date.getMonth()/12)*360}, 70%, 50%)`;
                    date.setDate(date.getDate() + 1);
                }
                    
            
                let section = <Section>{
                    name: name,
                    start: ((offset)/(d.total/(d.spiralCoeff ?? 1))) * 360,
                    end: ((step+offset)/(d.total/(d.spiralCoeff ?? 1))) * 360,
                    color:color,
                    id:i,
                };
                offset += step;
                return section;
            });
        });

        dials = {...dials, ...days};
      ;
    }



    let dialPos = {
        milliseconds:0,
        seconds:0,
        minutes:0,
        hours:0,
        daysInWeek:0,
        daysInYear:0,
    }
    

    function updateCalendar()
    {
        const d = new Date();


        
        dialPos.milliseconds = d.getMilliseconds() / 1000;
        dialPos.seconds = (d.getSeconds() + dialPos.milliseconds)/60;
        dialPos.minutes = (d.getMinutes() + dialPos.seconds)/60;
        dialPos.hours =  (d.getHours() + dialPos.minutes)/24;
        dialPos.daysInYear = (dayOfTheYear() + dialPos.hours + Math.round(dials.daysInYear.total/2)) / 42;
        dialPos.daysInWeek = (d.getDay() + dialPos.hours)/(7*6);


        Object.entries<number>(dialPos).forEach(([k,p]) =>{
            dialPos[k] =Math.round(800 * (p * 360))/800;
        });
        setTimeout(updateCalendar, 10);
    }
    initDays();
    initTime();
    
    
    updateCalendar();
    
</script>


<svg viewBox="0 0 100 100" width="800" height="800" style="overflow:visible;">
        {#each Object.entries(dials) as [k, dial]  }
            {#each dial.sections as section, i}
                <path
                    d={svgFunctions.arc( dial.r1, dial.r2,section.start,section.end, dial.spiralCoeff, dialPos[dial.name])} 
                    style="stroke:white;stroke-width:0.1%; 
                    {
                    (section.end < dialPos[dial.name] || dial.hideProgress) ?
                        `fill:${section.color};` :
                        `fill:#e6e6e6; `
                    }"
                    transform={` translate(50 50)  rotate(${ section.start + 180 - dialPos[dial.name]}) `}     
                />
                {#if section.start < dialPos[dial.name] && section.end > dialPos[dial.name] && ! dial.hideProgress}
                <path
                    d={svgFunctions.arc( dial.r1, dial.r2 ,section.start,dialPos[dial.name], dial.spiralCoeff, dialPos[dial.name])} 
                    style="stroke:white;stroke-width:0.1%; fill:{section.color}; filter: opacity(40%);"
                    transform={` translate(50 50)  rotate(${ section.start + 180 - dialPos[dial.name]}) `}     
                />
                {/if}
                    <path
                        id={`path-${dial.name+":"+section.id}`}
                        d={svgFunctions.textArc(dial.r1, dial.r2, section.start,section.end, dial.spiralCoeff, dialPos[dial.name])}  
                        transform={`translate(50 50) rotate(${(section.start) + 180 - dialPos[dial.name]}) `}
                        fill=none
                    /> 
                    <text
                        class="section-text"
                        dominant-baseline="middle" 
                    >
                        <textPath
                            startOffset={` ${ svgFunctions.arcLength(dial.r1, dial.r2, section.start,section.end, dial.spiralCoeff, dialPos[dial.name])/2  - (0.13 * dial.fontSize * (section.name.length))/3 }`} 
                            font-size={dial.fontSize + "%"}
                            style="stroke-width: {dial.fontSize/25}%;"
                            href={`#path-${dial.name+":"+section.id}`}>
                                {section.name}
                        </textPath>
                        
                    </text> 
            {/each}
        {/each}

</svg>


<style>
    .section-text{
        font-family: 'Consolas', monospace;
        text-align: end;
        pointer-events: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        paint-order: stroke;
        stroke: #ffffff91;
        stroke-width: 0.6%;
        stroke-linecap: butt;
        stroke-linejoin: round;
        font-weight: 800;
    }
</style>
