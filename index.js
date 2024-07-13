"use strict";
const getusername = document.querySelector("#user");
const getform = document.querySelector("#form");
const main_container = document.querySelector(".main");
//Reusable Function
async function customfetcher(url, options) {
    fetch(url, options);
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network Response was not OK : status ${response.status}`);
    }
    const data = await response.json();
    return data;
}
const showresultui = (singleuser) => {
    main_container.insertAdjacentHTML("beforeend", `
        <div class="card">
        <img src=${singleuser.avatar_url} alt=${singleuser.login} />
        
        <div class="footer">
        <img src="${singleuser.avatar_url}" alt="${singleuser.login}" />
        <a href="${singleuser.url}"> Github </a>
        <div/>
        </div>
        `);
};
function fetchuserdata(url) {
    customfetcher(url, {}).then((userinfo) => {
        for (const singleuser of userinfo) {
            showresultui(singleuser);
            console.log("login  " + singleuser.id);
        }
    });
}
//Default function Call
fetchuserdata("https://api.github.com/users");
