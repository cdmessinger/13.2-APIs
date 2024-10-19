// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

// zQXOzfSopoWd0AC0llGEpzC5QCQTnZGJ backup API key if first doesn't work

//selecting everything:
//search button:
const gifBtn = document.getElementById("gif-generator");
//clear button:
const clearBtn = document.getElementById("clear");
//gif container:
const gifDiv = document.getElementById("gif-container");
//search input:
const gifSearch = document.getElementById("gif-input");

//function to search giphy:
async function giphyRequest(searchTerm) {
     try {
          const response = await axios.get(
               `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchTerm}`
          );
          let url = response.data.data[0].images.original.url; //grabbing the url to set the src
          let newImg = document.createElement("img");
          newImg.src = url; // setting the src for the img
          newImg.className = "gif"; // setting style for images
          gifDiv.prepend(newImg); // adding the gif to the container
     } catch (error) {
          if (
               error.message !==
               "Cannot read properties of undefined (reading 'images')" //this error message happens when the search bar is empty. I find it annoying to leave it, so if we get any other error message we run this code:
          ) {
               let h3 = document.createElement("h3");
               h3.innerText = "Error";
               let p = document.createElement("p");
               p.innerText = error.message || "An unexpected error has occured";
               let newDiv = document.createElement("div");
               newDiv.appendChild(h3);
               newDiv.appendChild(p);
               newDiv.className = "error"; // adds the error styling
               gifDiv.prepend(newDiv); // creates a new error div if it occurs
          }
     }
}

gifBtn.addEventListener("click", function (e) {
     e.preventDefault();

     let textInput = gifSearch.value;
     giphyRequest(textInput); //calls the search function when clicking the button
});

clearBtn.addEventListener("click", function (e) {
     e.preventDefault();
     gifDiv.innerHTML = ""; // sets the innerHTML to empty, clearing everything
     gifSearch.value = ""; // clears the search bar
});
