import { displayNotesInTable } from "./displayNotesInTable.js";
import { updateSummaryTable } from "./updateSummaryTable.js";
import {archiveNote} from "./archiveNote.js";

export function deleteNote(noteId) {
  const indexToDelete = notesData.findIndex((note) => note.id === noteId);
  if (indexToDelete !== -1) {
    notesData.splice(indexToDelete, 1);
  }

  displayNotesInTable(
    notesData.filter((note) => !note.archived),
    "notesTable"
  );

  updateSummaryTable();
}
