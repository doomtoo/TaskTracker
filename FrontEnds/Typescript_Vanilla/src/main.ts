import { Test } from "./test";
import {UI} from "./UI";

var test:Test = new Test();




$(document).ready(function(){
    // $("#login").html("Hello MEgan!!!");
    // $("#register").css("display", "block");


    // let hello:Test = new Test();
    // hello.Log("testing log from Jquery");


});
// console.log("this bundled object: "+JSON.stringify(this));
// console.log(this);


// let hello:Test = new Test();
// hello.Log("testing log");

/*
import * as $ from "jquery";

//import * as $ from ‘jquery’;


// import {Test} from 'test';

// import {Test} = require('.test');


$(document).ready(function(){
    $("#login").html("Hello there");
    $("#register").css("display", "block");

    let hello:Test = new Test();
    hello.Log("testing log");


});
*/

export class MainObj
{
    public  ui:UI = new UI();

    /*
    For registering a new user- get the email address, password, and attempt to register
     */
    Register()
    {

        //have to cast as any to get typescript to ignore that jquery.val may return undefined, and errors out
        let email:string = <any>$("#register_email").val();
        let pwd:string = <any>$("#register_pwd").val();
        console.log("Register: email and pwd entered: "+email+", "+pwd);

        //so lets check the input first, and provide an error if something was wrong/ they didn't enter both inputs

        //now lets try to submit these to the php page, and get whether they were registered successfully
    }
    Login()
    {

    }

}
var Main:MainObj = new MainObj();


//cast window as any to trick typescript into not throwing an error because window doesn't have property main
(window as any).Main=Main;