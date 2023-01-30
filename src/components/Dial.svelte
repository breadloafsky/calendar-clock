

<script lang="ts">
    import { svgFunctions } from "../utils/svgFunctions";
    import type {DialProps, SectionProps} from "../types";



    export let dial: DialProps;
    export let currentValue: number;
    export let sectionType: "default"|"progress"; 

</script>
   

        
<path
    
    d={svgFunctions.arc( dial.r1 , dial.r2, currentValue )} 
    style={`stroke-width:0.1%; fill:${dial.color}; filter:opacity(100%);`}
    
    transform={` translate(50 50)  rotate(${ 180 - currentValue }) `}     
    on:mousemove={(e) => dial.onMouseMove(e)}
/>

<g transform={`rotate(${-currentValue},50,50)`}>
    {#each dial.sections as section}

        <path
            d={svgFunctions.dash(dial.r2, dial.r1)}  
            transform={`translate(50 50) rotate(${section.start + 180}) `}
            style="stroke-width: 0.1%; stroke:white;"
        />
    
        <path
            id={`path-${dial.name+":"+section.id}`}
            d={svgFunctions.textArc((dial.r1+dial.r2)/2, section.end-section.start)}  
            transform={`translate(50 50) rotate(${section.start + 180 + (dial.labelPos == "start" ? (section.start-section.end)/2 : 0)}) `}
            fill=none
        />
        <text
            class="section-text"
            dominant-baseline="middle" 
            
        >
            <textPath
                startOffset={` ${ svgFunctions.arcLength((dial.r1+dial.r2)/2, (section.end-section.start))/2  - (0.13 * dial.fontSize * (section.name.length))/3 }`}
                font-size={dial.fontSize + "%"}
                fill="white"
                stroke="black"
                
                stroke-width={dial.fontSize/40}
                href={`#path-${dial.name+":"+section.id}`}>
                    {section.name}
            </textPath>
        </text>
    
    {/each}
</g>





        




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
