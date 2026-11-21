// FIND THE JOB PAGE ELEMENTS

const jobSearch = document.getElementById("jobSearch");
const jobCategory = document.getElementById("jobCategory");

const jobSearchButton = document.getElementById("jobSearchButton");
const clearJobFilters = document.getElementById("clearJobFilters");

// Only select job cards that have a data-category (the demo listings)
// This avoids the crash on the external source cards
const jobCards = document.querySelectorAll(".job-card[data-category]");

const jobResultMessage = document.getElementById("jobResultMessage");
const noJobResults = document.getElementById("noJobResults");


// FILTER JOBS

function filterJobs() {

    const searchText = jobSearch.value.toLowerCase().trim();

    const selectedCategory = jobCategory.value;

    const searchWords = searchText.split(/\s+/).filter(Boolean);

    let visibleJobs = 0;

    jobCards.forEach(function (card) {

        const keywords = (card.dataset.keywords || "").toLowerCase();

        const title = card.querySelector("h3").textContent.toLowerCase();

        const matchesSearch = searchWords.every(function (word) {

            return keywords.includes(word) || title.includes(word);

        });

        const matchesCategory =
            selectedCategory === "all" ||
            card.dataset.category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            card.style.display = "block";
            visibleJobs++;

        } else {

            card.style.display = "none";

        }

    });

    noJobResults.hidden = visibleJobs !== 0;

    if (searchText === "" && selectedCategory === "all") {
        jobResultMessage.textContent = "Showing example job listings.";
    } else {
        jobResultMessage.textContent =
            "Found " + visibleJobs + " example job listing(s).";
    }

}


// SEARCH BUTTON

jobSearchButton.addEventListener("click", filterJobs);


// PRESS ENTER TO SEARCH

jobSearch.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        filterJobs();
    }

});


// CHANGE CATEGORY

jobCategory.addEventListener("change", filterJobs);


// CLEAR FILTERS

clearJobFilters.addEventListener("click", function () {

    jobSearch.value = "";
    jobCategory.value = "all";

    filterJobs();

});