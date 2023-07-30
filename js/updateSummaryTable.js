
function getSummaryData() {
  const activeNotes = [...notesData].filter((note) => !note.archived);
  const archivedNotes = [...notesData].filter((note) => note.archived);

  const summaryData = [
    { category: "Task", activeCount: 0, archivedCount: 0 },
    { category: "Random Thought", activeCount: 0, archivedCount: 0 },
    { category: "Idea", activeCount: 0, archivedCount: 0 },
  ];

  activeNotes.forEach((note) => {
    const category = note.category;
    const categoryIndex = summaryData.findIndex(
      (data) => data.category === category
    );
    summaryData[categoryIndex].activeCount++;
  });

  archivedNotes.forEach((note) => {
    const category = note.category;
    const categoryIndex = summaryData.findIndex(
      (data) => data.category === category
    );
    summaryData[categoryIndex].archivedCount++;
  });

  return summaryData;
}

function renderSummaryTable(summaryData) {
  const summaryTable = document.getElementById("summaryTable");
  summaryTable.innerHTML = "";

  const headers = ["Category", "Active Notes", "Archived Notes"];
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  summaryTable.appendChild(headerRow);

  summaryData.forEach((data) => {
    const row = document.createElement("tr");
    const categoryCell = document.createElement("td");
    const activeCountCell = document.createElement("td");
    const archivedCountCell = document.createElement("td");

    categoryCell.textContent = data.category;
    activeCountCell.textContent = data.activeCount;
    archivedCountCell.textContent = data.archivedCount;

    row.appendChild(categoryCell);
    row.appendChild(activeCountCell);
    row.appendChild(archivedCountCell);

    summaryTable.appendChild(row);
  });
}

export function updateSummaryTable() {
  const summaryData = getSummaryData();
  renderSummaryTable(summaryData);
}
