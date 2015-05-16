// ==UserScript==
// @name         btc-empire.com bot
// @description  Automatically claims the renevue.
// @namespace  https://github.com/Uncertified-Robot
// @version      0.1
// @author       Uncertified Robot
// @match        http://btc-empire.com/Index.html
// @copyright   2015+, Uncertified Robot
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

var minSatoshi = 1; //1 satoshi = 10 of those things you get on the site.
//Anything below 1 satoshi will simply not be collected on their site.





$(document).ready(function(){
    function collect(){
        minSatoshi= minSatoshi*0.00000001;
        if(parseFloat(document.getElementById('timer').innerText)> minSatoshi){
            if(document.getElementById('timer').innerText.slice(-1)=="0"){
                console.log("Collecting");
                document.getElementsByClassName("btn btn-custom btn-lg btn-block")[0].click();
            }
        }
        setTimeout(collect,500);
    }
    collect();
});
