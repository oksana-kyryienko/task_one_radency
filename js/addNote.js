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
        return;
      }

      if (!category) {
        alert("Please choose note category.");
        return;
      }

      const newNote = {
        id: notesData.length + 1,
        created: new Date().toISOString(),
        content: content,
        category: category,
        datesMentioned: datesMentioned,
        archived: false,
      };

      notesData.push(newNote);
      

      modal.style.display = "none";
      displayNotesInTable(
        notesData.filter((note) => !note.archived),
        "notesTable"
      );
      updateSummaryTable();
      addNoteModalBtn.removeEventListener("click", saveChanges);
    } catch (error) {
      console.error("Error occurred while adding the note:", error);
    }
  }
}
