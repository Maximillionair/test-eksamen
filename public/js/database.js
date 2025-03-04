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