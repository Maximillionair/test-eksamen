document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchQuery = document.getElementById("search-query");
    const searchResults = document.getElementById("search-results");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = searchQuery.value.trim();
        if (!query) return;

        try {
            const response = await fetch(`/reindeer/search?query=${encodeURIComponent(query)}`);
            const data = await response.json(); // Forventer JSON-respons

            // Tøm tidligere resultater
            searchResults.innerHTML = "";

            if (data.length === 0) {
                searchResults.innerHTML = "<p>Ingen reinsdyr funnet.</p>";
                return;
            }

            // Lag en liste med resultater
            const list = document.createElement("ul");
            data.forEach(reindeer => {
                const listItem = document.createElement("li");
                listItem.textContent = `${reindeer.name} (ID: ${reindeer._id})`;
                list.appendChild(listItem);
            });

            searchResults.appendChild(list);
        } catch (error) {
            console.error("Feil ved søk:", error);
            searchResults.innerHTML = "<p>En feil oppstod under søket.</p>";
        }
    });
});
