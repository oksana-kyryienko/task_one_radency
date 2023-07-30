import { displayNotesInTable } from "./displayNotesInTable.js";

export function toggleNotes(type) {
  const activeBtn = document.getElementById("showActiveBtn");
  const archivedBtn = document.getElementById("showArchivedBtn");
  const notesTableWrapper = document.getElementById("notesTableWrapper");
  const archivedTableWrapper = document.getElementById("archivedTableWrapper");

  if (type === "active") {
    activeBtn.classList.add("active");
    archivedBtn.classList.remove("active");
    notesTableWrapper.style.display = "block";
    archivedTableWrapper.style.display = "none";
    displayNotesInTable(
      notesData.filter((note) => !note.archived),
      "notesTable"
    );
  } else {
    activeBtn.classList.remove("active");
    archivedBtn.classList.add("active");
    notesTableWrapper.style.display = "none";
    archivedTableWrapper.style.display = "block";
    displayNotesInTable(
      notesData.filter((note) => note.archived),
      "archivedTable"
    );
  }
}
