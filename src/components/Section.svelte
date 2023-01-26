

<script lang="ts">
    import { svgFunctions } from "../utils/svgFunctions";
    import type {DialProps, SectionProps} from "../types";

    let dials : { [key: string]: DialProps } = {};


    export let section: SectionProps;
    export let dial: DialProps;
    export let currentValue: number;
    export let sectionType: "default"|"progress"; 

    
 
    
</script>
    <!--  -->

    {#if sectionType == "default"}
        <path
             d={svgFunctions.arc( dial.r1, dial.r2, section.end-section.start)} 
            style="stroke:white;stroke-width:0.1%; 
            {
                (section.end < currentValue || dial.hideProgress) ?
                    `fill:${section.color};` :
                    `fill:#e6e6e6; `
            }"
            transform={` translate(50 50)  rotate(${section.start + 180 - currentValue}) `}     
            on:mousemove={(e) => dial.onMouseMove(e)}
        />
        <path
            id={`path-${dial.name+":"+section.id}`}
            d={svgFunctions.textArc((dial.r1+dial.r2)/2, section.end-section.start)}  
            transform={`translate(50 50) rotate(${section.start + 180 - currentValue }) `}
            fill=none
        /> 
        <text
            class="section-text"
            dominant-baseline="middle" 
        >
            <textPath
                startOffset={` ${ svgFunctions.arcLength((dial.r1+dial.r2)/2, (section.end-section.start))/2  - (0.13 * dial.fontSize * (section.name.length))/3 }`} 
                font-size={dial.fontSize + "%"}
                style="stroke-width: {dial.fontSize/25}%;"
                href={`#path-${dial.name+":"+section.id}`}>
                    {section.name}
            </textPath>
        </text> 

    {:else}
        <!-- show progress of the current section -->
        <path
            d={svgFunctions.arc( dial.r1, dial.r2 , currentValue-section.start)} 
            style="stroke:white;stroke-width:0.1%; fill:{section.color}; filter: opacity(40%);"
            pointer-events="none"
            transform={` translate(50 50)  rotate(${ section.start + 180 - currentValue}) `}     
        /> 
    {/if}



        




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
