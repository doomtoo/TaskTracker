export class Tools
{
    public static IsNull(obj:any)
    {
        return obj===null||obj===undefined||obj.length===0||obj==="NULL";//for blank strings
    }
}