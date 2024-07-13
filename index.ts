const getusername = document.querySelector("#user") as HTMLInputElement;
const getform = document.querySelector("#form") as HTMLFormElement;
const main_container = document.querySelector(".main") as HTMLElement;

//lets define the contract of an object

interface userdata {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

//Reusable Function
async function customfetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  fetch(url, options);
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Network Response was not OK : status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

const showresultui = (singleuser: userdata) => {
  main_container.insertAdjacentHTML(
    "beforeend",
    `
        <div class="card">
        <img src=${singleuser.avatar_url} alt=${singleuser.login} />
        
        <div class="footer">
        <img src="${singleuser.avatar_url}" alt="${singleuser.login}" />
        <a href="${singleuser.url}"> Github </a>
        <div/>
        </div>
        `
  );
};
function fetchuserdata(url: string) {
  customfetcher<userdata[]>(url, {}).then((userinfo) => {
    for (const singleuser of userinfo) {
      showresultui(singleuser);
      console.log("login  " + singleuser.id);
    }
  });
}

//Default function Call

fetchuserdata("https://api.github.com/users");
