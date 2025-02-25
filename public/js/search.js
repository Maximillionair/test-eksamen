document.getElementById("searchForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = document.getElementById("searchInput").value;

    try {
        const response = await fetch(`/reindeer/search?query=${query}`);
        const data = await response.json();

        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = ""; // Tøm gamle resultater

        if (!data.success || data.data.length === 0) {
            resultsContainer.innerHTML = "<p>Ingen reinsdyr funnet</p>";
            return;
        }

        data.data.forEach(reindeer => {
            const div = document.createElement("div");
            div.innerHTML = `<strong>${reindeer.name}</strong> - Flokk: ${reindeer.flock}`;
            resultsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Feil ved henting av reinsdyr:", error);
    }
});
