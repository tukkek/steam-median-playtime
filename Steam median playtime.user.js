// ==UserScript==
// @name         Steam median playtime
// @namespace    Alex Henry
// @version      1.0
// @description  Shows median playtime from "most helpful" reviews on Steam store pages
// @author       Alex Henry
// @match        https://store.steampowered.com/app/*
// @grant        GM_registerMenuCommand
// ==/UserScript==
function process(){
    let reviews=document.querySelector('.user_reviews_container .leftcol')
    let hours=[]
    for(let playtime of reviews.querySelectorAll('.hours')){
        let played=playtime.textContent.trim().replace(',','').split(' ')[0]
        hours.push(Number(played))
    }
    if(hours.length==0){
        window.alert('Reviews not yet loaded or not found! Scroll down manually?')
        return
    }
    hours=hours.sort((a,b)=>a-b)
    console.log('Playtimes found: ',hours)
    let median=Math.round(hours.length/2)
    window.alert('Median time played: '+hours[median])
}

GM_registerMenuCommand('Show median playtime',process,'m')