import { CarImage } from "./carImage";

export interface CarDto{
    id:number;
    brandName:string;
    model:string;
    modelYear:string;
    colorName:string;
    images:CarImage[];
    dailyPrice:number;
    findeks?:number;
}