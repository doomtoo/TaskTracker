export class UI
{
    PopUp(text:string)
    {
        console.log(text);
    }


    ShowRegister()
    {
        $("#register").css("display", "block");
        $ ("#login").css("display", "none");
    }

    ShowLogin()
    {
        $("#register").css("display", "none");
        $ ("#login").css("display", "block");
        console.log("ShowLogin!!!");
    }
}