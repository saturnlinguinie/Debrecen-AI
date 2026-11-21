// FIND THE HTML ELEMENTS

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const serviceCards = document.querySelectorAll(".service-card");

const noResults = document.getElementById("noResults");
const serviceMessage = document.getElementById("serviceMessage");


// SEARCH FUNCTION

function searchServices() {

    const searchText = searchInput.value.toLowerCase().trim();

    let visibleCards = 0;

    const searchWords = searchText.split(/\s+/).filter(Boolean);

    serviceCards.forEach(function (card) {

        const keywords = (card.dataset.keywords || "").toLowerCase();

        const title = card.querySelector("h3").textContent.toLowerCase();

        const matches = searchWords.every(function (word) {
            return keywords.includes(word) || title.includes(word);
        });

        if (searchText === "" || matches) {

            card.style.display = "block";
            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });

    noResults.hidden = visibleCards !== 0;

    serviceMessage.textContent = "";

}


// SEARCH BUTTON CLICK

searchButton.addEventListener("click", searchServices);


// SEARCH WHEN PRESSING ENTER

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchServices();
    }

});


// CLICK ON SERVICE CARDS (only fires if card has no link inside)

serviceCards.forEach(function (card) {

    // Skip cards that are links or contain a link/button
    if (card.tagName === "A") return;
    if (card.querySelector("a")) return;

    card.addEventListener("click", function () {
        const serviceName = card.querySelector("h3").textContent;
        serviceMessage.textContent =
            "You selected " + serviceName +
            ". More information coming soon!";
    });

});