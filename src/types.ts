export interface SectionProps{
    name:string; //  the visible label of the section
    start:number;       //  the start angle of the section
    end:number;         //  the end angle of the section
    id:number;
};

export interface DialProps {
    name:string;    //  the name of the dial
    color?:string;
    r1:number;
    r2:number;
    total:number;
    sections:SectionProps[];
    fontSize:number;
    labelPos:"start"|"middle";
    dashSize:number;
    onMouseMove(e):Function;
};

export interface DialPos {
    milliseconds:number,
    seconds:number,
    minutes:number,
    hours:number,
    dayInterval:number,
    daysInWeek:number,
    daysInMonth:number,
    monthsInYear:number;
};