document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/reindeer/search"); // Henter data fra backend
        const data = await response.json();

        const tableBody = document.getElementById("database-table-body");
        tableBody.innerHTML = ""; // Tømmer gammel data før vi legger til ny

        data.forEach(reindeer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reindeer.name}</td>
                <td>${reindeer.flock}</td>
                <td>${reindeer.age}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching database data:", error);
    }
});
