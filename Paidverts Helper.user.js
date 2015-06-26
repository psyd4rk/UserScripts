// ==UserScript==
// @name        Paidverts Autofiller
// @description This will automatically fill in the 3 text captcha's and open the ad!
// @include     http://paidverts.com/member/*
// @include     http://www.paidverts.com/member/*
// @include     https://www.paidverts.com/member/*
// @include     http://Uncertified-Robot.github.io/UserScripts/*
// @copyright   2015+, Uncertified Robot
// @namespace  https://github.com/Uncertified-Robot
// @version    1.2.2.0
// @updateURL   https://raw.githubusercontent.com/Uncertified-Robot/UserScripts/master/Paidverts%20Autofiller.user.js
// @downloadURL     https://raw.githubusercontent.com/Uncertified-Robot/UserScripts/master/Paidverts%20Autofiller.user.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==


//Settings: http://uncertified-robot.github.io/UserScripts/PVSettings.html



/////////////////////////////////////////CODE - DO NOT TOUCH ANYTHING BELOW THIS/////////////////////////////////////////

//Default settings.
var sound = true;
var autoselect = true;
var newTab = false;
var autoRefresh = false;
var interval = 35;
var alertSound="SCII.wav";
var autoClose = false;

if(GM_getValue("firstTime") === undefined){
    alert("Thank you for installing Paidverts Autofiller!");
    alert("You can change the settings at: http://uncertified-robot.github.io/UserScripts/PVSettings.html");
    GM_setValue("firstTime", false);
    GM_setValue("sound",true);
    GM_setValue("autoselect",true);
    GM_setValue("newtab",false);
    GM_setValue("autorefresh",false);
    GM_setValue("interval",35);
    GM_setValue("alertSound","SCII.wav");
    GM_setValue("autoClose",false);

}
var sound = GM_getValue("sound");
var autoselect = GM_getValue("autoselect");
var newTab = GM_getValue("newtab");
var autoRefresh = GM_getValue("autorefresh");
var interval = GM_getValue("interval");
var alertSound = GM_getValue("alertSound");
var autoClose = GM_getValue("autoClose");





var evt = document.createEvent("HTMLEvents");
evt.initEvent("click", true, true);
$(document).ready(function(){


    if(document.location.href=="http://uncertified-robot.github.io/UserScripts/PVSettings.html"){
        $("#sound").prop("checked", GM_getValue("sound"));
        $("#autoselect").prop("checked", GM_getValue("autoselect"));
        $("#newTab").prop("checked", GM_getValue("newtab"));
        $("#autorefresh").prop("checked", GM_getValue("autorefresh"));
        $("#alert").val(GM_getValue("alertSound"));
        document.getElementById("interval").value= GM_getValue("interval");
        $("#autoClose").prop("checked", GM_getValue("autoClose"));

        $("#save").click(function(){
            var sound = $("#sound").is(":checked");
            var autoselect = $("#autoselect").is(":checked");
            var newTab = $("#newTab").is(":checked");
            var autoRefresh = $("#autorefresh").is(":checked");
            var interval = document.getElementById("interval").value;
            var alertSound = $("#alert").find('option:selected').val();
            var autoClose = $("#autoClose").is(":checked");
            GM_setValue("sound",sound);
            GM_setValue("autoselect",autoselect);
            GM_setValue("newtab",newTab);
            GM_setValue("autorefresh",autoRefresh);
            GM_setValue("interval",interval);
            GM_setValue("alertSound",alertSound);
            GM_setValue("autoClose",autoClose);



            $("#msg").css("background", "#2ecc71") 
            $("#msg").css("border", "1px #27ae60 solid");
            $("#msg").text("Settings succesfully saved!");
            setTimeout(function() {
                $("#msg").css("background", "") 
                $("#msg").css("border", "");
                $("#msg").text("");
            },5000);

        });
    }


    if(document.location.href.indexOf("/paid_ads.html") > -1){

        if(newTab === true){
            $( "a:contains('order by')" ).click(function() {
                $(".view").attr("target", "_BLANK");
            });

            $('.view').attr("target", "_BLANK");

        }
        if(autoselect === true){
            document.getElementById('worth').scrollIntoView(true);
            if(newTab===true){
                var url = $('#view-1').attr("href");
                var newWindow = window.open(url); 
            }else{
                document.getElementById('view-1').dispatchEvent(evt);
            }
        }

        if(autoRefresh===true){
            setTimeout(function(){location.reload();},interval*1000);
        }
    }

    if(document.location.href.indexOf("paidverts.com/member/paid_ads_interaction") > -1 || document.location.href.indexOf("paidverts.com/member/activation_ad.html") > -1){
        document.getElementById('copy-1').dispatchEvent(evt);
        if(document.getElementById('copy-3') != undefined){

            document.getElementById('copy-2').dispatchEvent(evt);
            document.getElementById('copy-3').dispatchEvent(evt);
        }
        document.getElementById('view_ad').dispatchEvent(evt);
        if(document.getElementById("text-3") != undefined){
            var viewBtn = document.getElementById("text-3");
            viewBtn.scrollIntoView(true);
        }
        if(newTab === true){
            window.close(url);
        }

    }

    if(document.location.href.indexOf("/member/paid_ads_view_") > -1){
        if(autoClose===true){
            $("#button").click(function(){
                setTimeout(function(){
                    $("#closeBtn").click();
                },500);
            });
        }
        var timeout = document.getElementById("seconds").innerText;
        if(timeout.indexOf("econd") > -1 ){
            timeout = parseInt(timeout)*1000;
        }else{
            timeout = 30000;
        }
        if(sound === true){
            setTimeout(function() {

                var snd = new Audio("http://uncertified-robot.github.io/UserScripts/sounds/"+alertSound); 
                snd.play();
            }, timeout);
        }
    }
});
