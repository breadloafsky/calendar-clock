
export const svgFunctions = {
    arc:function(radius:number, angle:number){
        let path = "";
        angle = angle > 360 ? 360 : angle;
        let rad = -angle * (Math.PI/180);
        path += `M ${0} ${radius} `
        path += `A ${radius} ${radius}, 0, ${angle >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;
        return path;
    },
    dash:function(innerRadius:number, radius:number)
    {
        return `M ${0} ${radius} ` +
        `L ${0} ${innerRadius} z` ;
    },
    arcLength:function(radius:number, angle:number)
    {
        return  radius * angle * (Math.PI/180);        
    },
}; 






