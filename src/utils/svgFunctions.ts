export const svgFunctions = {
    arc:function(innerRadius:number, radius:number, angle1:number, angle2:number, spiralCoeff:number = null, dialPosition:number = null){
        let path = "";
        let degree = angle2 - angle1;
        degree = degree > 360 ? 360 : degree;
        let rad = -degree * (Math.PI/180);
        let radius2 = radius;
        let innerRadius2 = innerRadius;

        if(spiralCoeff)
        {
            let radiusBand = (radius-innerRadius);  // the overall width of the spiral
            let sectionWidth = radiusBand/(spiralCoeff+1);
            radiusBand -= sectionWidth;

            let newInnerRadius = innerRadius + radiusBand/(360*spiralCoeff/angle2); 
            let newRadius = newInnerRadius + sectionWidth;
            
            innerRadius2 = innerRadius + radiusBand/(360*spiralCoeff/angle1);
            radius2 = innerRadius2 + sectionWidth;
            
            innerRadius = newInnerRadius;
            radius = newRadius;
        } 
        

        path += `M ${0} ${radius2} `
        path += `A ${radius} ${radius}, 0, ${degree >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;

        path += `L ${Math.sin(rad)*innerRadius} ${Math.cos(rad)*innerRadius} `
        path += `A ${innerRadius} ${innerRadius}, 0, ${degree >= 180 ? 1 : 0}, 0, ${0} ${innerRadius2} `;
        path += `L 0 ${innerRadius2} `;
       
        path += "z";
        return path;
    },
    textArc:function(innerRadius:number, radius:number, angle1:number, angle2:number, spiralCoeff:number = null, dialPosition:number = null){
        let path = "";
        let degree = angle2 - angle1;
        degree = degree > 360 ? 360 : degree;
        let rad = -degree * (Math.PI/180);

        if(spiralCoeff)
        {
            let radiusBand = (radius-innerRadius);  // the overall width of the spiral
            let sectionWidth = radiusBand/(spiralCoeff+1);
            radiusBand -= sectionWidth;
            radius = (innerRadius + radiusBand/(360*spiralCoeff/((angle1+angle2)/2))) + sectionWidth/2;
        }
        else
            radius = (radius + innerRadius)/2;
        


        path += `M 0 ${radius} `;
        path += `A ${radius} ${radius}, 0, ${degree >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;
        return path;
    },
    arcLength:function(innerRadius:number, radius:number, angle1:number, angle2:number, spiralCoeff:number = null, dialPosition:number = null)
    {
        if(spiralCoeff)
        {
            let radiusBand = (radius-innerRadius);  // the overall width of the spiral
            let sectionWidth = radiusBand/(spiralCoeff+1);
            radiusBand -= sectionWidth;
            radius = (innerRadius + radiusBand/(360*spiralCoeff/((angle1+angle2)/2))) + sectionWidth/2;
        }
        else
            radius = (radius + innerRadius)/2;
        return  radius * (angle2-angle1) * (Math.PI/180);        
    }
}; 

/* export const svgFunctions = {
    arc:function(innerRadius:number, radius:number, angle1:number, angle2:number, spiralCoeff:number = null, dialPosition:number = null){
        let path = "";
        let degree = angle2 - angle1;
        degree = degree > 360 ? 360 : degree;
        let rad = -degree * (Math.PI/180);
        let radius2 = radius;
        let innerRadius2 = innerRadius;

        if(spiralCoeff)
        {
            let radiusBand = (radius-innerRadius);  // the overall width of the spiral
            let sectionWidth = radiusBand/spiralCoeff;
            
            
            let newInnerRadius = innerRadius + radiusBand/(360*spiralCoeff/angle2); 
            let newRadius = newInnerRadius + sectionWidth;
            
            innerRadius2 = innerRadius + radiusBand/(360*spiralCoeff/angle1);
            radius2 = innerRadius2 + sectionWidth;
            
            innerRadius = newInnerRadius;
            radius = newRadius;
        } 
        

        path += `M ${0} ${radius2} `
        path += `A ${radius} ${radius}, 0, ${degree >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;

        path += `L ${Math.sin(rad)*innerRadius} ${Math.cos(rad)*innerRadius} `
        path += `A ${innerRadius} ${innerRadius}, 0, ${degree >= 180 ? 1 : 0}, 0, ${0} ${innerRadius2} `;
        path += `L 0 ${innerRadius2} `;
       
        path += "z";
        return path;
    },
    textArc:function(innerRadius:number, radius:number, angle1:number, angle2:number, spiralCoeff:number = null, dialPosition:number = null){
        let path = "";
        let degree = angle2 - angle1;
        degree = degree > 360 ? 360 : degree;
        let rad = -degree * (Math.PI/180);

        if(spiralCoeff)
        {
            let radiusBand = (radius-innerRadius);  // the overall width of the spiral
            let sectionWidth = radiusBand/spiralCoeff;
            radius = (innerRadius + radiusBand/(360*spiralCoeff/((angle1+angle2)/2))) + sectionWidth/2;
        }
        else
            radius = (radius + innerRadius)/2;
        


        path += `M 0 ${radius} `;
        path += `A ${radius} ${radius}, 0, ${degree >= 180 ? 1 : 0}, 1, ${Math.sin(rad)*radius} ${Math.cos(rad)*radius} `;
        return path;
    },
    arcLength:function(innerRadius:number, radius:number, angle1:number, angle2:number, spiralCoeff:number = null, dialPosition:number = null)
    {
        if(spiralCoeff)
        {
            let radiusBand = (radius-innerRadius);
            let sectionWidth = radiusBand/spiralCoeff;
            radius = (innerRadius + radiusBand/(360*spiralCoeff/((angle1+angle2)/2))) + sectionWidth/2;
        }
        else
            radius = (radius + innerRadius)/2;
        return  radius * (angle2-angle1) * (Math.PI/180);        
    }
};  */