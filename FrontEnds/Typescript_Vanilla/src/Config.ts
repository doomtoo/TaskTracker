
/*
For storing constants for changing out backends
 */
export class Config
{
    //no static const in JS, so just using a getter makes it so it can't be changed
    public static get BACKEND_URL():string
    {
        return "http://ackmi.com/projects/TaskTracker/mysql_connect.php";
    }
}