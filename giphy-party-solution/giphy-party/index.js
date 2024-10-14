const giphyCpiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
// our buttons which will create or clear GIFs //
const generateGifsButton = document.getElementById("generate-gifs-btn");
const clearGifsButton = document.getElementById("clear-gifs-btn");
// display div in which gifs will be displayed //
const display = document.getElementById("display-div");

// event listener to generate GIFs //
generateGifsButton.addEventListener("click", generateGifs);
clearGifsButton.addEventListener("click", clearGifs);

// this function handles our API request and returns the GIF url data //
async function grabGifFromApi(query) {

  const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyCpiKey}&limit=10`);

  return response.data.data.map((val) => {
    return {
      gifURL: val.images.fixed_width.url
    }
  });
}

// this function will get the input data //
function getInputData() {
  // grab the input value and return it //
  const dataInput = document.getElementById("search-input");
  return dataInput.value;
}

async function generateGifs(e) {
  e.preventDefault();

  display.innerHTML = "";

  const inputData = getInputData();

  // now we need to pass the input data to the API //
  const gifs = await grabGifFromApi(inputData)

  const firstRow = document.createElement("div");
  const secondRow = document.createElement("div");

  firstRow.classList.add("row", "first");
  secondRow.classList.add("row", "second");

  // 5 gifs for the first row //
  for (let i = 0; i < gifs.length / 2; i++) {
    const image = document.createElement("img");
    
    image.src = gifs[i].gifURL;

    firstRow.appendChild(image);
  }

  // 5 gifs for the second row //
  for (let i = 5; i < gifs.length; i++) {
    const image = document.createElement("img");
    
    image.src = gifs[i].gifURL;

    secondRow.appendChild(image);
  }

  // append both rows to the parent <div> //
  display.appendChild(firstRow);
  display.appendChild(secondRow);
};

// this function will clear the created GIFs //
function clearGifs() {
  display.innerHTML = "";
  display.innerHTML = "... GIF here ...";
}

