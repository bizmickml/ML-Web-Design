export default function leadForm(container, redirect) {
  container.innerHTML = `
    <form id="vsl-lead-form">
      <div class="form-loading-overlay hidden">
        <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
      </div>
      <h2>Sign up for a FREE, no obligation strategy session</h2>
      <fieldset>
        <label for="name-input">Name:</label>
        <input id="name-input" name="name" type="text" placeholder="Theodore Roosevelt" required autocomplete="name">
      </fieldset>
      <fieldset>
        <label for="email-input">Email:</label>
        <input id="email-input" name="email" type="email" placeholder="your_name@email.com" required autocomplete="email">
      </fieldset>
      <fieldset>
        <label for="message-input">Message:</label>
        <textarea id="message-input" wrap="hard" name="message" autocomplete="off">Yes Mike, I'm interested in getting 50% off my entire first year. Please contact me to schedule my FREE strategy session.</textarea>
      </fieldset>
      <input id="time-input" type="hidden" name="date">
      <input id="device-width-input" type="hidden" name="device_width">
      <input id="device-height-input" type="hidden" name="device_height">
      <input id="window-width-input" type="hidden" name="window_width">
      <input id="window-height-input" type="hidden" name="window_height">
      <input id="platform-input" type="hidden" name="platform">
      <input id="isMobile-input" type="hidden" name="isMobile">

      <button class="cta-btn" type="submit" onclick="gtag_report_conversion()">Submit</button>
    </form>
  `;

  const loadingOverlay = document.querySelector('.form-loading-overlay');

  async function post (data) { 
    const url = 'https://script.google.com/macros/s/AKfycbztwKtPgwG8j8M3oplKVifAbiM8WAmtpLsS_uDtFIzfubTSEaD9m-rcn4JMsQSPmqVx/exec';
    const leadForm = document.querySelector('#vsl-lead-form');

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
          leadForm.reset();
  
        } else if (data.success) {
          window.location = redirect;
        }
      })
      .catch((error) => {
        const msgDiv = document.createElement("div");
        msgDiv.innerText = message + `<br>${error}`;
        leadForm.insertAdjacentElement("afterend", msgDiv);
        loadingOverlay.classList.add("hidden");
        leadForm.reset();
      });
  }

  document.querySelector('#vsl-lead-form').addEventListener("submit", (e) => { 
    e.preventDefault();
    loadingOverlay.classList.remove("hidden");

    document.querySelector("#time-input").value = (new Date());
    document.querySelector('#device-width-input').value = screen.width;
    document.querySelector('#device-height-input').value = screen.height;
    document.querySelector('#window-width-input').value = window.innerWidth;
    document.querySelector('#window-height-input').value = window.innerHeight;
    document.querySelector('#platform-input').value = navigator.userAgentData.platform;
    document.querySelector('#isMobile-input').value = navigator.userAgentData.mobile;
    const formData = new FormData(e.target);
    const dataObj = {}
    
    for (const [key, value] of formData) {
      dataObj[key] = (value);
    }
    dataObj['form_name'] = e.target.id.replaceAll('-', "_");
  
    post(dataObj);
  })

}