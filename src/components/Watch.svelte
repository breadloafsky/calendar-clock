<script lang="ts">
    import { svgFunctions } from "../utils/svgFunctions";
    
    let dials = <Dial[]>[];

    interface Section{
        name:string|number; //  the visible label of the section
        start:number;       //  the start angle of the section
        end:number;         //  the end angle of the section
        color:string;
    }

    interface Dial {
        name:string;    //  the name of the dial
        color:string;
        r1:number;
        r2:number;
        sections:Section[];
    };

    let milliseconds = 0;


    function init(){
        //  create seconds dial
        let seconds= <Dial>{
            name:"Seconds",
            r1:18,
            r2:30,
        };
        let offset = 0;
        let total = 60;
        seconds.sections = [...Array(60).keys()].map(a=> {
 
            let step = 1;
            let section = <Section>{
                name: a, 
                start: ((offset)/total) * 360,
                end: ((step+offset)/total) * 360,
                color:"cornflowerblue"
            };
            offset += step;
            return section;
        });
        dials.push(seconds);
    }

    let dialPos = {
        seconds:0,
        minutes:0
    }
    

    function updateTime()
    {
        const d = new Date();
        let milliseconds = d.getMilliseconds();
        let seconds = d.getSeconds();


        dialPos.seconds = ((seconds + milliseconds/1000) / 60) * 360,
        setTimeout(updateTime, 10);
    }
    init();
    updateTime();
    
</script>


<svg viewBox="0 0 100 100" width="800" height="800" style="overflow:visible;">
    {#if dials.length > 0}
        {#each dials as dial}
            {#each dial.sections as section, i}
                <path
                    d={svgFunctions.arc( dial.r1, dial.r2 , section.end-section.start)} 
                    style="stroke:white;stroke-width:0.1%; fill:{section.color}; {(section.start < dialPos.seconds) ?"" : "filter: saturate(22%);"}"
                    transform={` translate(50 50)  rotate(${ section.start + 180 - dialPos.seconds}) `}     
                />
                <text
                    class="slice-text"
                    x={ Math.cos(((section.start+section.end + 360 + 180)/2-dialPos.seconds)* (Math.PI/180)) *(dial.r1 + dial.r2)/2}
                    y={ Math.sin(((section.start+section.end + 360 + 180)/2-dialPos.seconds)* (Math.PI/180)) *(dial.r1 + dial.r2)/2}
                    transform={`translate(50 50)`}
                    dominant-baseline="middle" 
                    text-anchor="middle"
                    font-size={10 + "%"}
                    style="stroke-width: {10/25}%;"
                    >{section.name}
                </text>
            {/each}
        {/each}

    {/if}
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
