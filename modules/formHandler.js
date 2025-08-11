export default async function post(data) {
  const url = 'https://script.google.com/macros/s/AKfycbztwKtPgwG8j8M3oplKVifAbiM8WAmtpLsS_uDtFIzfubTSEaD9m-rcn4JMsQSPmqVx/exec';
  const leadForm = document.querySelector('#vsl-lead-form');
  const loadingOverlay = document.querySelector(".loading-overlay");

  loadingOverlay.classList.remove("hidden");

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => { return response.json() })
    .then((data) => {
      let message;
      if (!data.success) {
        message = 'Something went wrong. Please try again.'
        const msgDiv = document.createElement("div");
        msgDiv.innerText = message;
        leadForm.insertAdjacentElement("afterend", msgDiv)
        loadingOverlay.classList.add("hidden");
  
      } else if (data.success) {
        window.location = "./schedule-page";
      }
    })
    .catch((error) => {
      const msgDiv = document.createElement("div");
      msgDiv.innerText = message + `<br>${error}`;
      leadForm.insertAdjacentElement("afterend", msgDiv);
      loadingOverlay.classList.add("hidden");

    });
  
  leadForm.reset();
}