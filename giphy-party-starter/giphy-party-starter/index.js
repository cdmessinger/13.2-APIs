// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

// zQXOzfSopoWd0AC0llGEpzC5QCQTnZGJ backup API key if first doesn't work

const gifBtn = document.getElementById("gif-generator");
const clearBtn = document.getElementById("clear");
const gifDiv = document.getElementById("gif-container");
const gifSearch = document.getElementById("gif-input");

async function giphyRequest(searchTerm) {
     try {
          const response = await axios.get(
               `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchTerm}`
          );
          let url = response.data.data[0].images.original.url;
          let newImg = document.createElement("img");
          newImg.src = url;
          newImg.className = "gif";
          gifDiv.prepend(newImg);
     } catch (error) {
          if (
               error.message !==
               "Cannot read properties of undefined (reading 'images')"
          ) {
               let h3 = document.createElement("h3");
               h3.innerText = "Error";
               let p = document.createElement("p");
               p.innerText = error.message || "An unexpected error has occured";
               let newDiv = document.createElement("div");
               newDiv.appendChild(h3);
               newDiv.appendChild(p);
               newDiv.className = "error";
               gifDiv.prepend(newDiv);
          }
     }
}

gifBtn.addEventListener("click", function (e) {
     e.preventDefault();

     let textInput = gifSearch.value;
     giphyRequest(textInput);
});

clearBtn.addEventListener("click", function (e) {
     e.preventDefault();
     gifDiv.innerHTML = "";
});
