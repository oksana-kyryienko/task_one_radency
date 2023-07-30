import { displayNotesInTable } from "./displayNotesInTable.js";
import { updateSummaryTable } from "./updateSummaryTable.js";

export function editNote(noteId) {
  try {
    const noteToEdit = notesData.find((note) => note.id === noteId);

    if (noteToEdit) {
      const modal = document.getElementById("modal");
      modal.style.display = "block";

      const noteContentInput = document.getElementById("noteContent");
      noteContentInput.value = noteToEdit.content;

      const noteCategoryInput = document.getElementById("noteCategory");
      noteCategoryInput.value = noteToEdit.category;

      const datesMentionedInput = document.getElementById("datesMentioned");
      datesMentionedInput.value = noteToEdit.datesMentioned.join(", ");

      const addNoteModalBtn = document.getElementById("addNoteModalBtn");
      addNoteModalBtn.textContent = "Save Changes";
      addNoteModalBtn.addEventListener("click", () => {
        const updatedContent = noteContentInput.value;
        const updatedCategory = noteCategoryInput.value;
        const updatedDatesMentioned = datesMentionedInput.value
          .split(",")
          .map((date) => date.trim());

        noteToEdit.content = updatedContent;
        noteToEdit.category = updatedCategory;
        noteToEdit.datesMentioned = updatedDatesMentioned;

        if (!noteToEdit.datesMentionedEdited) {
          noteToEdit.datesMentionedEdited = [];
        }

        if (
          !noteToEdit.datesMentionedEdited.includes(
            noteToEdit.datesMentioned[0]
          )
        ) {
          noteToEdit.datesMentionedEdited.push(noteToEdit.datesMentioned[0]);
        }

        for (const editedDate of updatedDatesMentioned) {
          if (!noteToEdit.datesMentionedEdited.includes(editedDate)) {
            noteToEdit.datesMentionedEdited.push(editedDate);
          }
        }

        modal.style.display = "none";

        displayNotesInTable(
          [...notesData].filter((note) => !note.archived),
          "notesTable"
        );

        updateSummaryTable();
      });
    }
  } catch (error) {
    console.error("Error occurred while editing the note:", error);
  }
}
