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

document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("database-table-body");

    try {
        const response = await fetch("/api/reindeer"); // Henter reinsdyr fra serveren
        const data = await response.json();

        if (!data.success) throw new Error(data.message);

        tableBody.innerHTML = ""; // Tømmer tabellen før vi legger til nye data

        data.data.forEach(reindeer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reindeer.name}</td>
                <td>${reindeer.flock ? reindeer.flock.name : "Ingen flokk"}</td>
                <td>${reindeer.age}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading reindeer:", error);
        tableBody.innerHTML = `<tr><td colspan="3">Kunne ikke laste reinsdyr</td></tr>`;
    }
});