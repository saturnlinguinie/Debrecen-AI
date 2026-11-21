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

    // 1. If the search box is empty, show all cards
    if (searchText === "") {
        serviceCards.forEach(function (card) {
            card.style.display = "flex"; // Keeps your quirky card layout intact
        });
        noResults.hidden = true; // Hide the error message
        serviceMessage.textContent = ""; // Clear any selected card message
        return;
    }

    // 2. Otherwise, do the normal search
    const searchWords = searchText.split(/\s+/).filter(Boolean);

    serviceCards.forEach(function (card) {

        const keywords = (card.dataset.keywords || "").toLowerCase();
        const titleElement = card.querySelector("h3");
        const title = titleElement ? titleElement.textContent.toLowerCase() : "";

        // Check if every word typed matches the keywords or title
        const matches = searchWords.every(function (word) {
            return keywords.includes(word) || title.includes(word);
        });

        if (matches) {
            card.style.display = "flex"; // Show matching card
            visibleCards++;
        } else {
            card.style.display = "none"; // Hide non-matching card
        }

    });

    // 3. Show or hide the "No results" message based on the count
    if (visibleCards === 0) {
        noResults.hidden = false;
    } else {
        noResults.hidden = true;
    }

    serviceMessage.textContent = "";
}


// EVENT LISTENERS

// Trigger search when clicking the button
searchButton.addEventListener("click", searchServices);

// Trigger search when pressing Enter
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchServices();
    }
});

// LIVE SEARCH: Triggers automatically as you type or delete
searchInput.addEventListener("input", searchServices);


// CLICK ON SERVICE CARDS (Placeholder message)
serviceCards.forEach(function (card) {
    // Skip cards that contain a link (like the new button cards)
    if (card.tagName === "A" || card.querySelector("a")) return;

    card.addEventListener("click", function () {
        const serviceName = card.querySelector("h3").textContent;
        serviceMessage.textContent = "You selected " + serviceName + ". More information coming soon!";
    });
});