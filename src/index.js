document.addEventListener("DOMContentLoaded", () => {
  console.log("The document is ready!");

  const baseUrl = "http://localhost:3000";
  console.log("API base URL:", baseUrl);

  const fetchAndDisplayBeer = (beerId) => {
    console.log("Fetching beer with ID:", beerId);

    fetch(`${baseUrl}/beers/${beerId}`)
      .then((response) => response.json())
      .then((beerData) => {
        console.log("Received beer data:", beerData);

        // main section
        const beerName = document.getElementById("beer-name");
        const beerDescription = document.getElementById("beer-description");
        const beerImage = document.getElementById("beer-image");
        const reviewList = document.getElementById("review-list");

        beerName.textContent = beerData.name;
        beerDescription.textContent = beerData.description;
        beerImage.src = beerData.image_url;

        // Display reviews
        reviewList.innerHTML = "";
        beerData.reviews.forEach((review) => {
          console.log("Review:", review);
          const li = document.createElement("li");
          li.textContent = review;
          reviewList.appendChild(li);
        });
      });
  };

  const fetchAndDisplayBeerMenu = () => {
    console.log("Fetching and displaying the beer menu");

    const beerList = document.getElementById("beer-list");

    fetch(`${baseUrl}/beers`)
      .then((response) => response.json())
      .then((beers) => {
        console.log("Received beer menu:", beers);

        beers.forEach((beer) => {
          const li = document.createElement("li");
          li.textContent = beer.name;
          li.addEventListener("click", () => {
            fetchAndDisplayBeer(beer.id);
          });
          beerList.appendChild(li);
        });
      });
  };

  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Review form submitted!");

    const newReview = document.getElementById("review").value;
    const reviewList = document.getElementById("review-list");
    const li = document.createElement("li");
    li.textContent = newReview;
    reviewList.appendChild(li);
    document.getElementById("review").value = ""; 
  });

  fetchAndDisplayBeerMenu();
  fetchAndDisplayBeer(1); // Display the first beer by default
});
