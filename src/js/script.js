import * as bootstrap from "bootstrap";
import Fuse from "fuse.js";

document.addEventListener("DOMContentLoaded", function () {
	const projects = [
		{tags: ["poster", "art"], title: "Poster"},
		{tags: ["logo", "brand"], title: "Brand"},
		{tags: ["profile", "company"], title: "Company Profile"},
		{tags: ["logo"], title: "Logo"},
	];

	const fuse = new Fuse(projects, {keys: ["tags"]});
	const searchInput = document.getElementById("searchInput");
	const closeButton = document.getElementById("closeButton");
	const projectCards = document.querySelectorAll(".project");
	const noResultsMessage = document.getElementById("noResultsMessage");

	// Function to update card visibility based on search value
	function updateCardVisibility(searchValue) {
		let resultsFound = false;

		projectCards.forEach((card) => {
			const cardTags = card.getAttribute("data-tags").toLowerCase().split(" ");
			const isMatch =
				searchValue === "" ||
				fuse.search(searchValue).some((result) => {
					return cardTags.some((tag) => result.item.tags.includes(tag));
				});

			card.style.display = isMatch ? "block" : "none";

			if (isMatch) {
				resultsFound = true;
			}
		});

		// Show or hide the close button based on whether the search input is empty
		closeButton.classList.toggle("d-none", searchValue === "");

		// Display "Results not found" message if no matching cards are found
		noResultsMessage.style.display = resultsFound ? "none" : "block";
	}

	// Event listener for the close button
	closeButton.addEventListener("click", function () {
		searchInput.value = ""; // Clear the search input
		closeButton.classList.add("d-none"); // Hide the close button
		updateCardVisibility(""); // Restore the normal card display
	});

	// Event listener for the search input
	searchInput.addEventListener("input", function () {
		const searchValue = searchInput.value.trim().toLowerCase();
		updateCardVisibility(searchValue);
	});

	// Hide the "Results not found" message initially
	noResultsMessage.style.display = "none";
});
