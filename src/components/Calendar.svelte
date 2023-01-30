

<script lang="ts">
    import { dateFunctions } from "../utils/dateFunctions";
    import type {DialProps, SectionProps, DialPos} from "../types";
    import Dial from "./Dial.svelte";
    

    let dials : { [key: string]: DialProps } = {};

    export let dialPos :DialPos;
  
    //  initialize dials
    function initDays() {
        let date = new Date();

        let numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, -1).getDate()+1;
        
        let calendar : { [key: string]: DialProps } = {};
        calendar.daysInMonth = <DialProps>{
            name:"daysInMonth",
            r1:26,
            r2:29,
            total: numberOfDays,     
            fontSize:10,
            color:"orange",
            labelPos:"middle",
        };
        calendar.daysInWeek = <DialProps>{
            name:"daysInWeek",
            r1:30,
            r2:31,
            total: numberOfDays,     
            fontSize:9,
            labelPos:"middle",
        };
        Object.entries<DialProps>(calendar).forEach( ([k, d] ) => {

            let offset = 0;
            date = new Date(date.getFullYear(), date.getMonth(), 1);

       

            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let name = a+1+"";
                
                if(k == "daysInWeek")
                    name = ["Mo","Tu","We","Th","Fr","Sa","Su"][(offset+6)%7];
                else
                    name = date.getDate()+"";
                
                date.setDate(date.getDate() + 1);
                let section = <SectionProps>{
                    name: name,
                    start: (offset/d.total) * 360,
                    end: ((step+offset)/d.total) * 360,
                    color:d.color,
                    id:i,
                };
                offset += step;
                return section;
            });
        });

        dials = {...dials, ...calendar};
    }

    function initMonths() {
        const date = new Date(new Date().getFullYear(), 0, 1);
        let daysInYear = dateFunctions.daysInYear(new Date().getFullYear());
        let monthsInYear = <DialProps>{
            name:"monthsInYear",
            r1:32,
            r2:35,
            total: 12,     
            fontSize:10,
            color:"darkorange",
            labelPos:"middle",
        };
    
        let offset = 0;
        date.setDate(date.getDate());
        monthsInYear.sections =  [...Array(monthsInYear.total).keys()].map((a,i)=> {
            let step = new Date(date.getFullYear(), i + 1, -1).getDate()+1;;
            let name = new Date(date.getFullYear(), i, 1).toLocaleString('default', { month: 'long' });;
            let section = <SectionProps>{
                name: name,
                start: (offset/daysInYear) * 360,
                end: ((step+offset)/daysInYear) * 360,
                color:monthsInYear.color,
                id:i,
            };
            offset += step;
            return section;
        });
        

        dials = {...dials, monthsInYear};
    }

    initDays();
    initMonths();
    
</script>



{#each Object.entries(dials) as [k, dial]  }
    <Dial sectionType="default" dial={dial} currentValue={dialPos[dial.name]} />
{/each}





