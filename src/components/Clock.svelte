

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
    }

    interface Dial {
        name:string;    //  the name of the dial
        color?:string;
        r1:number;
        r2:number;
        total:number;
        sections:Section[];
        spiralCoeff?:number;
        fontSize:number;
    };

    let milliseconds = 0;

    //  initialize dials
    function initTime(){
        dials.seconds = <Dial>{
            name:"seconds",
            r1:15,
            r2:18,
            total:60,
            color:"lightsteelblue",
            fontSize:7,
        };
        dials.minutes = <Dial>{
            name:"minutes",
            r1:18,
            r2:22,
            total:60,
            color:"cornflowerblue",
            fontSize:8,
        };
        dials.hours = <Dial>{
            name:"hours",
            r1:22,
            r2:26,
            total:24,
            color:"dodgerblue",
            fontSize:10,
        };
        
        Object.entries<Dial>(dials).forEach( ([k, d] ) => {
            let offset = 0;
            d.sections =  [...Array(d.total).keys()].map(a=> {
                let step = 1;
                let section = <Section>{
                    name: a+1+"",
                    start: ((offset)/d.total) * 360,
                    end: ((step+offset)/d.total) * 360,
                    color:d.color
                };
                offset += step;
                return section;
            });
        });
    }

    function initDays() {
        const date = new Date();
        //new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        let daysInMonth = <Dial>{
            name:"daysInMonth",
            r1:30,
            r2:40,
            total: 126,
            color:"orange",
            spiralCoeff:3,
            fontSize:10,
        };
            let offset = 0;
            daysInMonth.sections =  [...Array(daysInMonth.total).keys()].map(a=> {
                let step = 1;
                let section = <Section>{
                    name: a+1+"",
                    start: ((offset)/(daysInMonth.total/daysInMonth.spiralCoeff)) * 360,
                    end: ((step+offset)/(daysInMonth.total/daysInMonth.spiralCoeff)) * 360,
                    color:daysInMonth.color
                };
                offset += step;
                return section;
            });
            dials.daysInMonth = daysInMonth;
    }



    let dialPos = {
        milliseconds:0,
        seconds:0,
        minutes:0,
        hours:0,
        daysInMonth:0,
    }
    

    function updateCalendar()
    {
        const d = new Date();
        dialPos.milliseconds = d.getMilliseconds() / 1000;
        dialPos.seconds = (d.getSeconds() + dialPos.milliseconds)/60;
        dialPos.minutes = (d.getMinutes() + dialPos.seconds)/60;
        dialPos.hours =  (d.getHours() + dialPos.minutes)/24;
        dialPos.daysInMonth = (d.getDate() + dialPos.hours + 42) / 42;


        Object.entries<number>(dialPos).forEach(([k,p]) =>{
            dialPos[k] = p *360;
        });
        setTimeout(updateCalendar, 10);
    }

    initTime();
    initDays();
    
    updateCalendar();
    
</script>


<svg viewBox="0 0 100 100" width="800" height="800" style="overflow:visible;">
        {#each Object.entries(dials) as [k, dial]  }
            {#each dial.sections as section, i}
                <path
                    d={svgFunctions.arc( dial.r1, dial.r2,section.start,section.end, dial.spiralCoeff, dialPos[dial.name])} 
                    style="stroke:white;stroke-width:0.1%; 
                    {
                    (section.end < dialPos[dial.name]) ?
                        `fill:${section.color}` :
                        `fill:lightgray; filter: opacity(40%)`
                    }"
                    transform={` translate(50 50)  rotate(${ section.start + 180 - dialPos[dial.name]}) `}     
                />
                {#if section.start < dialPos[dial.name] && section.end > dialPos[dial.name]}
                <path
                    d={svgFunctions.arc( dial.r1, dial.r2 ,section.start,dialPos[dial.name], dial.spiralCoeff, dialPos[dial.name])} 
                    style="stroke:white;stroke-width:0.1%; fill:{section.color}; filter: opacity(40%);"
                    transform={` translate(50 50)  rotate(${ section.start + 180 - dialPos[dial.name]}) `}     
                />
                {/if}
                    <path
                        id={`path-${dial.name+":"+section.name}`}
                        d={svgFunctions.textArc(dial.r1, dial.r2, section.start,section.end, dial.spiralCoeff, dialPos[dial.name])}  
                        transform={`translate(50 50) rotate(${(section.start) + 180 - dialPos[dial.name]}) `}
                        fill=none
                    /> 
                    <text
                        class="section-text"
                        dominant-baseline="middle" 
                    >
                        <textPath
                            startOffset={` ${ (((dial.r2 + dial.r1)/2) * (section.end-section.start) * (Math.PI/180))/2  - (0.13 * dial.fontSize * (section.name.length))/3 }`} 
                            font-size={dial.fontSize + "%"}
                            style="stroke-width: {dial.fontSize/25}%;"
                            href={`#path-${dial.name+":"+section.name}`}>
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
