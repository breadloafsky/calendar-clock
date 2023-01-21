export const svgFunctions = {
    arc:function(radius:number, innerRadius:number, degree:number){
        let path = "";
        degree = degree > 360 ? 360 : degree;
        let rad = -degree * (Math.PI/180);
        

        path += `M ${0} ${radius} `
        path += `A ${radius} ${radius}, 0, ${degree >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;

        path += `L ${Math.sin(rad)*innerRadius} ${Math.cos(rad)*innerRadius} `
        path += `A ${innerRadius} ${innerRadius}, 0, ${degree >= 180 ? 1 : 0}, 0, ${0} ${innerRadius} `;
        path += `L 0 ${innerRadius} `;
       
        path += "z";
        return path;
    },
    textArc:function(radius:number, degree:number, flip:boolean){
        let path = "";
        degree = degree > 360 ? 360 : degree;
        let rad = -degree * (Math.PI/180);

        path += `M ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;
        path += `A ${radius} ${radius}, 0, ${degree >= 180 ? 1 : 0}, 0, ${0} ${radius} `;
        
        return path;
    },
    textProps:function(radius:number){
        let props = {x:0, y:0, rotate:0};
        props.x = radius;
        //props.y = radius;
        return props;
    }
};