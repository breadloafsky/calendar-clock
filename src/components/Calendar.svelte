

<script lang="ts">
    import { dateFunctions } from "../utils/dateFunctions";
    import type {DialProps, SectionProps, DialPos} from "../types";
    import Section from "./Section.svelte";
    

    let dials : { [key: string]: DialProps } = {};

    let monthsColors = [...Array(12).keys()].map((a,i)=> `hsl(${i * 360 / 12}, 60%, 70%)`);

    export let dialPos :DialPos;
    

  
    //  initialize dials
    function initDays() {
        let date = new Date();

        let numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, -1).getDate()+1;
        
        let calendar : { [key: string]: DialProps } = {};
        calendar.daysInMonth = <DialProps>{
            name:"daysInMonth",
            r1:26,
            r2:30,
            total: numberOfDays,     
            fontSize:10,
        };
        calendar.daysInWeek = <DialProps>{
            name:"daysInWeek",
            r1:30,
            r2:32,
            total: numberOfDays,     
            fontSize:10,
            hideProgress:true,
        };
        Object.entries<DialProps>(calendar).forEach( ([k, d] ) => {

            let offset = 0;
            date = new Date(date.getFullYear(), date.getMonth(), 1);

            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let name = a+1+"";
                let color = d.color;

                if(k == "daysInWeek")
                {
                    name = ["Mo","Tu","We","Th","Fr","Sa","Su"][(offset+6)%7];
                    color =  ["Sa","Su"].includes(name) ? "darkgray" : "lightgray";
                }
                else
                {
                    name = date.getDate()+"";
                    color =  monthsColors[date.getMonth()];
                }
                date.setDate(date.getDate() + 1);
                let section = <SectionProps>{
                    name: name,
                    start: (offset/d.total) * 360,
                    end: ((step+offset)/d.total) * 360,
                    color:color,
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
            r2:36,
            total: 12,     
            fontSize:10,
        };
    
        let offset = 0;
        date.setDate(date.getDate());
        monthsInYear.sections =  [...Array(monthsInYear.total).keys()].map((a,i)=> {


            let step = new Date(date.getFullYear(), i, -1).getDate()+1;;
            let name = a+1+"";
            let color = monthsColors[i];
            let section = <SectionProps>{
                name: name,
                start: (offset/daysInYear) * 360,
                end: ((step+offset)/daysInYear) * 360,
                color:color,
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
    {#each dial.sections as section, i}
        <Section sectionType="default" section={section} dial={dial} currentValue={dialPos[dial.name]} />
        
        {#if section.start < dialPos[dial.name] && section.end > dialPos[dial.name] && ! dial.hideProgress}
            <!-- show progress of the current section -->
            <Section sectionType="progress" section={section} dial={dial} currentValue={dialPos[dial.name]} />
        {/if}
    {/each}
{/each}





