import { displayNotesInTable } from "./js/displayNotesInTable.js";
import { addNote } from "./js/addNote.js";
import { updateSummaryTable } from "./js/updateSummaryTable.js";
import { toggleNotes } from "./js/toggleNotes.js";

window.notesData = [
  {
    id: 1,
    created: "2023-07-26T10:00:00Z",
    content: "Remember to buy groceries",
    category: "Task",
    datesMentioned: ["2023-07-28"],
  },
];

displayNotesInTable(
  notesData.filter((note) => !note.archived),
  "notesTable"
);

updateSummaryTable();

document.getElementById("addNoteBtn").addEventListener("click", addNote);

document
  .getElementsByClassName("close")[0]
  .addEventListener("click", closeModal);

document
  .getElementById("showActiveBtn")
  .addEventListener("click", () => toggleNotes("active"));
document
  .getElementById("showArchivedBtn")
  .addEventListener("click", () => toggleNotes("archived"));

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
