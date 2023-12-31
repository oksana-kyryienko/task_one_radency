import { displayNotesInTable } from "./displayNotesInTable.js";
import { updateSummaryTable } from "./updateSummaryTable.js";

export function addNote() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const addNoteModalBtn = document.getElementById("addNoteModalBtn");
  addNoteModalBtn.textContent = "Add Note";

  const noteContentInput = document.getElementById("noteContent");
  const noteCategoryInput = document.getElementById("noteCategory");
  const datesMentionedInput = document.getElementById("datesMentioned");

  noteContentInput.value = "";
  noteCategoryInput.value = "";
  datesMentionedInput.value = "";
  addNoteModalBtn.onclick = null;

  addNoteModalBtn.addEventListener("click", saveChanges);

  function saveChanges() {
    let isValid = true;
    try {
      console.log("saveChanges function is called!");
      const content = noteContentInput.value;
      const category = noteCategoryInput.value;
      const datesMentioned = datesMentionedInput.value

        .split(",")
        .map((date) => date.trim());

      const contentPattern = /^(?=.*[a-zA-Zа-яА-Я0-9]).{3,200}$/;
      if (!content.match(contentPattern)) {
        alert(
          "Note content should be between 3 and 200 characters and contain at least one alphanumeric character."
        );
        isValid = false;
      }

      if (!category) {
        alert("Please choose note category.");
        isValid = false;
      }

      
      if (datesMentioned.length === 0 || datesMentioned[0] === "") {
        alert("Please select at least one date.");
        isValid = false;
      }

      if (isValid) {
        const originalCreatedDate = new Date().toISOString();
        const newNote = {
          id: notesData.length + 1,
          created: originalCreatedDate,
          content: content,
          category: category,
          datesMentioned: datesMentioned,
          archived: false,
        };

        notesData.push(newNote);
        modal.style.display = "none";
      }
      displayNotesInTable(
        notesData.filter((note) => !note.archived),
        "notesTable"
      );
      updateSummaryTable();
      if (!!isValid) {
        addNoteModalBtn.removeEventListener("click", saveChanges);
      }
    } catch (error) {
      console.error("Error occurred while adding the note:", error);
    }
  }
}
