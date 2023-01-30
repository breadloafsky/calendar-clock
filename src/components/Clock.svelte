

<script lang="ts">
    import type {DialProps, SectionProps, DialPos} from "../types";
    import Dial from "./Dial.svelte";
    
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
            labelPos:"start",
        };
        time.minutes = <DialProps>{
            name:"minutes",
            r1:18,
            r2:21,
            total:60,
            color:"cornflowerblue",
            fontSize:8,
            labelPos:"start",
        };
        time.hours = <DialProps>{
            name:"hours",
            r1:21,
            r2:24,
            total:24,
            color:"dodgerblue",
            fontSize:10,
            labelPos:"start",
        };
        time.dayInterval = <DialProps>{
            name:"dayInterval",
            r1:24,
            r2:26,
            total:2,
            fontSize:9,
            labelPos:"start",
        };
        
        Object.entries<DialProps>(time).forEach( ([k, d] ) => {
            let offset = 0;
            let color = d.color;
            

            d.sections =  [...Array(d.total).keys()].map((a,i)=> {
                let name = k == "dayInterval" ? ["AM","PM"][i] : a+"";
                

                let step = 1;
                let section = <SectionProps>{
                    name: name,
                    start: ((offset)/d.total) * 360,
                    end: ((step+offset)/d.total) * 360,
                    color:color,
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
    <Dial sectionType="default" dial={dial} currentValue={dialPos[dial.name]} />
{/each}


