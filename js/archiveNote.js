import { displayNotesInTable } from "./displayNotesInTable.js";
import { updateSummaryTable } from "./updateSummaryTable.js";

export function archiveNote(noteId) {
  const noteToArchive = notesData.find((note) => note.id === noteId);

  if (noteToArchive && !noteToArchive.archived) {
    noteToArchive.archived = true;

    displayNotesInTable(
      notesData.filter((note) => !note.archived),
      "notesTable"
    );
    updateSummaryTable();
  }
}
