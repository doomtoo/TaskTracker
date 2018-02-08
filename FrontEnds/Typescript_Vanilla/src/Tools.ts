export class Tools
{
    public static IsNull(obj:any):boolean
    {
        return obj===null||obj===undefined||obj.length===0||obj==="NULL";//for blank strings
    }

    public static SanitizeInput(str:string):string
    {
        //lets replace single quotes and double quotes with escaped quotes
        //first, lets escape the characters
        //str =  str.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
        str = encodeURI(str);

        //also encode single quotes
        str = str.replace(/'/g, "%27");

        console.log("escaped string: \n"+str+"\nunescaped str:\n"+Tools.UnSanitizeInput(str));
        return str;
    }

    /*
    for putting it back to human readable
     */
    public static UnSanitizeInput(str:string):string
    {
        str= decodeURI(str);
        str = str.replace(/%27/g, "'");
        return str;
    }

}