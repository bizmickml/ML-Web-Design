import getData from "./formAPI.js";

const container = document.getElementsByClassName("container")[0];
const countSpan = document.getElementById("count-span");
const btn = document.querySelector("button");
const overlay = document.getElementsByClassName("overlay")[0];
const testStorageItem = {
  request_1: (1754501027487 - (23 * 1000 * 60 * 60)),
  request_2: 1754501063756,
  request_3: 1754501081509,
  request_4: 1754501095826,
  request_5: 1754501102289,
};
const loadingStateManager = new EventTarget();
let isLoading = false;
// localStorage.clear()

function displayData(data) {
  container.innerHTML = '';

  if (Array.isArray(data)) {
    data.forEach((object) => {
      container.innerHTML += `
      <div id='entry-${object.id}' class="entry-container">
        <div id='entry-${object.id}-photo-container' class="photo-container"></div>
        <div id='entry-${object.id}-data-container' class="data-container"></div>
      </div>`
  
      for (const [key, value] of Object.entries(object)) {
        if (!(key === "photo")) {
          document.getElementById(`entry-${object.id}-data-container`).innerHTML += `
            <div class="key-value-line">
              <div class="key">${key.slice(0, 1).toUpperCase() + key.slice(1)}: </div>
              <div class="value">${value}</div>
            </div>
          `
  
        } else if (key === "photo") {
          document.getElementById(`entry-${object.id}-photo-container`).insertAdjacentHTML("afterbegin", `
              <img src="${object.photo}" alt="headshot photo">
          `)
        }
  
      }
    })
  
  } else if (data.success) {
    data.submissions.forEach((submissionObj, index) => { 
      container.innerHTML += `
        <div id='entry-${index + 1}' class="entry-container"></div>
      `;
    })

  }
}

async function useTestData() { 
  const address = `https://fake-json-api.mock.beeceptor.com/users`;
  isLoading = true;
  loadingStateManager.dispatchEvent(new CustomEvent("stateChange", { detail: isLoading }));

  try {
    const responseObj = await fetch(address);
    
    if (!responseObj.ok) {
      throw new Error(`Response status: ${responseObj.status}`)
    }

    const result = await responseObj.json();
    displayData(result);

  } catch (error) {

  }

  isLoading = false;
  loadingStateManager.dispatchEvent(new CustomEvent("stateChange", { detail: isLoading }));

}
async function test() {
  const address = `https://formsubmit.co/api/get-submissions/6712b8aa8c74789124e691e524f5c8f999288e855c2ad2f7c5c8d8568c5ce8ed`;
  try {
    const promise = await fetch(address);
    console.log(promise);

    const response = await promise.json();
    console.log(response)

  } catch {
    console.log(error)
  }

}

// test();
// /**
//    * Get Form Submission Data from formsubmit.co 
//    *  - only allowed 5 times per 24hr period
//    */
// async function getFormSubmitData() { 
//   const address = `https://formsubmit.co/api/get-submissions/6712b8aa8c74789124e691e524f5c8f999288e855c2ad2f7c5c8d8568c5ce8ed`;
//   isLoading = true;
//   loadingStateManager.dispatchEvent(new CustomEvent("stateChange", { detail: isLoading }));

//   try {
//     const responseObj = await fetch(address);
//     console.log(responseObj)
    
//     if (!responseObj.ok) {
//       throw new Error(`Response status: ${responseObj.status}`)
//     }

//     const result = await responseObj.json();
//     displayData(result)

//   } catch (error) {
//     container.insertAdjacentHTML("beforebegin", `
//       <div class="error">${error}</div>
//     `)
//   }

//   isLoading = false;
//   loadingStateManager.dispatchEvent(new CustomEvent("stateChange", { detail: isLoading }));

// }

function getRequestCount() {
  const date = new Date();
  const time = date.getTime();
  const allowedTimeFrame = (1000 * 60 * 60 * 24);
  const storageItemName = "requests"
  let requestCount = 0;
  let times = [];

  if (localStorage.getItem(storageItemName)) {
    const storageData = JSON.parse(localStorage.getItem(storageItemName));

    for (const [_key, value] of Object.entries(storageData)) {
      if (value > (time - allowedTimeFrame)) {
        requestCount++;
        times.push(value)
      }
    }
  } else {
    for (const [_key, value] of Object.entries(testStorageItem)) {
      if (value > (time - allowedTimeFrame)) {
        requestCount++;
        times.push(value)
      }
    }
  }

  const oldestTime = times.sort()[0]
  if (oldestTime - (new Date().getTime() - allowedTimeFrame) > 0) { requestCount = 5 };

  setInterval(() => {
    let timeToNext = oldestTime - (new Date().getTime() - allowedTimeFrame);

    if (timeToNext > 0) {
      let displayTime = timeToNext;
      let hours = Math.floor(displayTime / (1000 * 60 * 60));
      if (hours > 0) { displayTime -= (hours * 1000 * 60 * 60) };
      let minutes = Math.floor(displayTime / (1000 * 60));
      if (minutes > 0) { displayTime -= (minutes * 1000 * 60) };
      let seconds = Math.floor(displayTime / 1000);
  
      document.getElementById("time-span").textContent = `${hours > 0 ? hours + " : " : "00 : "}${minutes > 0 ? minutes + " : " : "00 : "}${seconds > 0 ? seconds : "00"}`
    }
  }, 1000);

  countSpan.textContent = requestCount
}

function countRequest() { 
  const date = new Date();
  const time = date.getTime();
  const allowedTimeFrame = (1000 * 60 * 60 * 24);
  const storageItemName = "requests"
  let requestCount = 0;
  const newStorageItem = {};

  if (!localStorage.getItem(storageItemName)) {
    localStorage.setItem(storageItemName, JSON.stringify({ request_1: time }));
    requestCount = 1;
    
  } else {
    const storageData = JSON.parse(localStorage.getItem(storageItemName));
    const storageTimes = [];

    for (const [_key, value] of Object.entries(storageData)) {
      if (value > (time - allowedTimeFrame)) {
        requestCount++;
        storageTimes.push(value);
      }
    }

    storageTimes.forEach((time, index) => {
      newStorageItem[`request_${index}`] = time;
    }) 

    localStorage.setItem(storageItemName, JSON.stringify(newStorageItem));
  }

}

loadingStateManager.addEventListener("stateChange", (event) => { 
  if (event.detail) {
    overlay.classList.contains("hidden") && overlay.classList.remove("hidden")

  } else if (!event.detail) {
    overlay.classList.add("hidden")
  }

})

btn.addEventListener("click", () => {
  isLoading = true;
  loadingStateManager.dispatchEvent(new CustomEvent("stateChange", { detail: isLoading }));

  displayData(getData())
  countRequest()
  getRequestCount()

  isLoading = false;
  loadingStateManager.dispatchEvent(new CustomEvent("stateChange", { detail: isLoading }));
  
})

window.onload = () => {
  getRequestCount()
  useTestData()
}