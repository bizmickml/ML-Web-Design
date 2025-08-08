const address = "https://formsubmit.co/api/get-submissions/";
const apiKey = "6712b8aa8c74789124e691e524f5c8f999288e855c2ad2f7c5c8d8568c5ce8ed";

async function getFormSubmitData() { 

  try {
    const responseObj = await fetch(address + apiKey);
    console.log(responseObj)
    
    if (!responseObj.ok) {
      throw new Error(`Response status: ${responseObj.status}`)
    }

    const result = await responseObj.json();
    console.log(result)
    
    return result

  } catch (error) {
    console.log(error)

    return error
  }

}

export default getFormSubmitData();