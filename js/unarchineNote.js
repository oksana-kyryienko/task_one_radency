import { displayNotesInTable } from "./displayNotesInTable.js";
import { updateSummaryTable } from "./updateSummaryTable.js";

export function unarchiveNote(noteId) {
  const noteToUnarchive = notesData.find((note) => note.id === noteId);

  if (noteToUnarchive) {
    noteToUnarchive.archived = false;

    displayNotesInTable(
      notesData.filter((note) => !note.archived),
      "notesTable"
    );
    updateSummaryTable();

    displayNotesInTable(
      notesData.filter((note) => note.archived),
      "archivedTable"
    );
    updateSummaryTable();
  }
}
