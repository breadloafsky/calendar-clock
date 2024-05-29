

<script lang="ts">
    import { svgFunctions } from "../utils/svgFunctions";
    import type { DialProps, SectionProps } from "../types";


    export let dial: DialProps;
    export let currentValue: number;
    export let expandAnim: number;


    function getRadius(r:number[], coeff:number)
    {
        return r[0] + (r[1]-r[0])*coeff;
    }

    let r1 = 0;
    let r2 = 0;

    $:{
        r1 = getRadius(dial.r1,expandAnim);
        r2 = getRadius(dial.r2,expandAnim);
    }

    

    let focus = false;

    function setFocus(value:boolean){
        focus= value;
    }

</script>
   

        
<path
    d={svgFunctions.arc( (r1 + r2)/2, currentValue )} 
    style={`stroke-width:${r2 - r1}; stroke:${dial.color}; fill:transparent; `}
    transform={` translate(40 40)  rotate(${ 180 - currentValue }) `}     
/>

<g transform={`rotate(${-currentValue},40,40)`}>
    {#each dial.sections as section}

        <rect
            width=0.2
            height={ expandAnim*(r2-r1)/ (dial.labelPos == "start" ? 4 : 1)}
            y={r1}
            transform={`translate(40 ,40) rotate(${section.start + 180}) `}
            fill="white"
            style="stroke-width: 0.1%; stroke:black;"
        />
        {#if dial.name == "monthsInYear"}
            <path
                id={`path-${dial.name+":"+section.id}`}
                d={svgFunctions.arc((r1 + r2) / 2, section.end-section.start)}  
                transform={`translate(40 40) rotate(${section.start + 180 + (dial.labelPos == "start" ? (section.start-section.end)/2 : 0)}) `}
                fill=none
            />
            <text
                class="section-text"
                dominant-baseline="middle" 
                opacity={expandAnim}
                
            >
                <textPath
                    startOffset={` ${ svgFunctions.arcLength((r1 + r2)/2, (section.end-section.start))/2  - (0.13 * dial.fontSize * (section.name.length))/3 }`}
                    font-size={dial.fontSize + "%"}
                    fill="white"
                    stroke="black"
                    
                    stroke-width={dial.fontSize/40}
                    href={`#path-${dial.name+":"+section.id}`}>
                        {section.name}
                </textPath>
            </text>
       
        {:else}
            <text
                class="section-text"
                text-anchor=middle 
                dominant-baseline=middle
                opacity={expandAnim}
                font-size={dial.fontSize + "%"}
                fill="white"
                stroke="black"    
                stroke-width={dial.fontSize/40}
                x = 0
                y = {-(r2 + r1)/2}
                transform={`translate(40 40) rotate(${section.start  - (dial.labelPos == "start" ? 0 : (section.start-section.end)/2)}) `}
                
            >{section.name}</text> 

        {/if}
    
    {/each}
</g>

<circle
    r={(r1 + r2)/2} 
    style={`stroke-width:${r2 - r1}; stroke:${"white"};  `}
    filter={`opacity(${focus ? 0.15 : 0})`}
    transform={` translate(40 40) `}
    fill=none
    on:mouseenter={() => setFocus(true)}
    on:mouseleave={() => setFocus(false)}
/> 

<style>
    .section-text{
        font-family: 'Consolas', monospace;
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
