

<script lang="ts">
    import type {DialProps, SectionProps, DialPos} from "../types";
    import Section from "./Section.svelte";
    
    let dials : { [key: string]: DialProps } = {};

    export let dialPos:DialPos;

    //  initialize dials
    function initTime(){
        let time : { [key: string]: DialProps } = {};
        time.seconds = <DialProps>{
            name:"seconds",
            r1:15,
            r2:18,
            total:60,
            color:"lightsteelblue",
            fontSize:7,
        };
        time.minutes = <DialProps>{
            name:"minutes",
            r1:18,
            r2:21,
            total:60,
            color:"cornflowerblue",
            fontSize:8,
        };
        time.hours = <DialProps>{
            name:"hours",
            r1:21,
            r2:24,
            total:24,
            color:"dodgerblue",
            fontSize:10,
        };
        
        Object.entries<DialProps>(time).forEach( ([k, d] ) => {
            let offset = 0;
            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let step = 1;
                let section = <SectionProps>{
                    name: a+"",
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
    
    initTime();
    
    
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


