

<script lang="ts">
    import { dateUtils } from "../utils/dateUtils";
    import type {DialProps, SectionProps, DialPos} from "../types";
    import Dial from "./Dial.svelte";
    

    let dials : { [key: string]: DialProps } = {};

    export let dialPos :DialPos;
    export let expandAnim: number;
  
    
    //  initialize dials
    export function initCalendar() {
        let date = new Date();
        let numberOfDays = dateUtils.daysInMonths()[date.getMonth()];
        let calendar : { [key: string]: DialProps } = {};
        calendar.monthsInYear = <DialProps>{
            name:"monthsInYear",
            r1:[24,30],
            r2:[26,33],
            total: 12,     
            fontSize:10,
            color:"darkorange",
            labelPos:"middle",
        };
        calendar.daysInWeek = <DialProps>{
            name:"daysInWeek",
            r1:[23,27.8],
            r2:[23,29],
            total: numberOfDays,     
            fontSize:9,
            labelPos:"middle",
        };
        calendar.daysInMonth = <DialProps>{
            name:"daysInMonth",
            r1:[21,25],
            r2:[23,27.5],
            total: numberOfDays,     
            fontSize:10,
            color:"orange",
            labelPos:"middle",
        };
        calendar.dayInterval = <DialProps>{
            name:"dayInterval",
            r1:[20,23.3],
            r2:[20,24.3],
            total:2,
            fontSize:9,
            labelPos:"middle",
        };
        
        calendar.hours = <DialProps>{
            name:"hours",
            r1:[18,21],
            r2:[20,23],
            total:24,
            color:"dodgerblue",
            fontSize:10,
            labelPos:"start",
        };
        
        calendar.minutes = <DialProps>{
            name:"minutes",
            r1:[15,18],
            r2:[17,20],
            total:60,
            color:"cornflowerblue",
            fontSize:8,
            labelPos:"start",
        };
        
        calendar.seconds = <DialProps>{
            name:"seconds",
            r1:[12,15],
            r2:[14,17],
            total:60,
            color:"lightsteelblue",
            fontSize:7,
            labelPos:"start",
        };

        
        Object.entries<DialProps>(calendar).forEach( ([k, d] ) => {
            let offset = 0;

            date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            
            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let name = a+"";
                if(k == "dayInterval")
                    name = ["AM","PM"][i];
                else if(k == "daysInWeek")
                    name = ["Su","Mo","Tu","We","Th","Fr","Sa"][date.getDay()];
                else if(k == "monthsInYear")
                {
                    step = (dateUtils.daysInMonths()[i]/dateUtils.daysInYear()) * 12;
                    name = new Date(new Date().getFullYear(), i, 1).toLocaleString('default', { month: 'long' });
                }
                else if(k == "daysInMonth")
                    name = date.getDate()+"";
                
                date.setDate(date.getDate() + 1);
                let section = <SectionProps>{
                    name: name,
                    start: (offset/d.total) * 360,
                    end: ((step+offset)/d.total) * 360,
                    id:i,
                };
                offset += step;
                return section;
            });
        });
        dials = {...dials, ...calendar};
    }

</script>



{#each Object.entries(dials) as [k, dial]  }
    <Dial  dial={dial} currentValue={dialPos[dial.name] * 360} expandAnim={expandAnim}/>
{/each}


<text
    class="face-text"
    text-anchor=middle 
    dominant-baseline=middle
    opacity={expandAnim}
    font-size={18 + "%"}
    fill="white"
    stroke="black"    
    stroke-width={16/40}
    x = 40
    y = {40-35}

>{dialPos.year}</text> 

<text
    class="face-text"
    text-anchor=middle 
    dominant-baseline=middle
    opacity={expandAnim}
    font-size={0 + 16*expandAnim + "%"}
    fill="white"
    stroke="black"    
    stroke-width={16/40}
    x = 40
    y = 40

>{`${
    [dialPos.hours*24,dialPos.minutes*60,dialPos.seconds*60]
        .map(e => ("0"+Math.floor(e)).slice(-2) ).join(":")
    }`}</text> 


<style>
    .face-text{
        font-family: 'Verdana';
        text-align: end;
        pointer-events: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        paint-order: stroke;
        stroke: #000000;
        stroke-linecap: butt;
        stroke-linejoin: round;
        font-weight: 800;
    }
</style>

