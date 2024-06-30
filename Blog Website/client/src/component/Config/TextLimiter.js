export const TextLimiter=(str,limit)=>{
    return str.length>limit?str.substring(0,limit)+'...':str;
}