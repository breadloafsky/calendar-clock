

<script lang="ts">
    import { dateUtils } from "../utils/dateUtils";
    import type {DialProps, SectionProps, DialPos} from "../types";
    import Dial from "./Dial.svelte";
    

    let dials : { [key: string]: DialProps } = {};

    export let dialPos :DialPos;
    export let expandAnim: number;
  
    //  initialize dials
    function initCalendar() {
        let date = new Date();
        let numberOfDays = dateUtils.daysInMonths()[date.getMonth()];

        let calendar : { [key: string]: DialProps } = {};

        calendar.seconds = <DialProps>{
            name:"seconds",
            r1:[12,15],
            r2:[14,17],
            total:60,
            color:"lightsteelblue",
            fontSize:7,
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
        calendar.hours = <DialProps>{
            name:"hours",
            r1:[18,21],
            r2:[20,23],
            total:24,
            color:"dodgerblue",
            fontSize:10,
            labelPos:"start",
        };
        calendar.dayInterval = <DialProps>{
            name:"dayInterval",
            r1:[20,23.3],
            r2:[20,25],
            total:2,
            fontSize:9,
            labelPos:"middle",
        };
        calendar.daysInMonth = <DialProps>{
            name:"daysInMonth",
            r1:[21,26],
            r2:[23,29],
            total: numberOfDays,     
            fontSize:10,
            color:"orange",
            labelPos:"middle",
        };
        calendar.daysInWeek = <DialProps>{
            name:"daysInWeek",
            r1:[23,29.3],
            r2:[23,31],
            total: numberOfDays,     
            fontSize:9,
            labelPos:"middle",
        };
        calendar.monthsInYear = <DialProps>{
            name:"monthsInYear",
            r1:[24,32],
            r2:[26,35],
            total: 12,     
            fontSize:10,
            color:"darkorange",
            labelPos:"middle",
        };

        
        Object.entries<DialProps>(calendar).forEach( ([k, d] ) => {
            let offset = 0;
            if(k == "daysInWeek")
                date = new Date();
            else
                date = new Date(date.getFullYear(), date.getMonth(), 1);

            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let name = a+1+"";
                if(k == "dayInterval")
                    name = ["AM","PM"][i];
                else if(k == "daysInWeek")
                    name = ["Su","Mo","Tu","We","Th","Fr","Sa"][date.getDay()];
                else if(k == "monthsInYear")
                {
                    step = (dateUtils.daysInMonths()[i]/dateUtils.daysInYear())*12;
                    name = new Date(new Date().getFullYear(), i, 1).toLocaleString('default', { month: 'long' });
                }
                else
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

    initCalendar();
    
    
</script>



{#each Object.entries(dials) as [k, dial]  }
    <Dial  dial={dial} currentValue={dialPos[dial.name] * 360} expandAnim={expandAnim}/>
{/each}





