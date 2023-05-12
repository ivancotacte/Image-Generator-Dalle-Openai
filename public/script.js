const makePostRequest = async (data, endpoint, callback) => {
	const sent = await fetch(endpoint, {
		method: 'POST',
        headers: {
        	'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
    	const response = await sent.json()
        callback(response)
    } catch (error) {
        console.log(error)
        callback(error)
    }
}
let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = document.getElementById('text').value;
    let img = document.getElementById('image');
    let alert = document.getElementById("alert-text");
    alert.textContent = "Generating image please wait...";
    makePostRequest({ text }, '/generate', (res) => {
      img.src= res.result.url;
      img.alt=text;
      setTimeout(() => {
        alert.textContent = `Here's the image of ${text}`
      }, 6000) 
    })
})
