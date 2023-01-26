
export const svgFunctions = {
    arc:function(innerRadius:number, radius:number, angle:number){
        let path = "";
        angle = angle > 360 ? 360 : angle;
        let rad = -angle * (Math.PI/180);
        

        path += `M ${0} ${radius} `
        path += `A ${radius} ${radius}, 0, ${angle >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;

        path += `L ${Math.sin(rad)*innerRadius} ${Math.cos(rad)*innerRadius} `
        path += `A ${innerRadius} ${innerRadius}, 0, ${angle >= 180 ? 1 : 0}, 0, ${0} ${innerRadius} `;
        path += `L 0 ${innerRadius} `;
       
        path += "z";
        return path;
    },
    textArc:function(radius:number, angle:number){
        let path = "";
        angle = angle > 360 ? 360 : angle;
        let rad = -angle * (Math.PI/180);


        path += `M ${0} ${radius} `
        path += `A ${radius} ${radius}, 0, ${angle >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;
        return path;
    },
    arcLength:function(radius, angle)
    {
        return  radius * angle * (Math.PI/180);        
    }
}; 






