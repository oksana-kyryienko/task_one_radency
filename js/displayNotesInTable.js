import { updateSummaryTable } from "./updateSummaryTable.js";
import { deleteNote } from "./deleteNote.js";
import { archiveNote } from "./archiveNote.js";
import { editNote } from "./editNote.js";
import { unarchiveNote } from "./unarchineNote.js";

export function displayNotesInTable(notes, tableId) {
  try {
    const table = document.getElementById(tableId);
    table.innerHTML = "";

    const headers = [
      "Time of Creation",
      "Note Content",
      "Note Category",
      "Dates Mentioned",
      "All Dates Mentioned",
      "Actions",
    ];
    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    notes.forEach((note) => {
      const row = document.createElement("tr");
      const createdCell = document.createElement("td");
      const contentCell = document.createElement("td");
      const categoryCell = document.createElement("td");
      const datesMentionedCell = document.createElement("td");
      const allDatesMentionedCell = document.createElement("td");
      const actionsCell = document.createElement("td");

      createdCell.textContent = new Date(note.created).toLocaleString();
      contentCell.textContent = note.content;
      categoryCell.textContent = note.category;
      datesMentionedCell.textContent = note.datesMentioned.join(", ");

      if (note.datesMentionedEdited && note.datesMentionedEdited.length > 0) {
        allDatesMentionedCell.textContent =
          note.datesMentionedEdited.join(", ");
      } else {
        allDatesMentionedCell.textContent = "";
      }

      const editBtn = createButton("Edit", "btn", () => editNote(note.id));
      const deleteBtn = createButton("Delete", "btn", () =>
        deleteNote(note.id)
      );

      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);

      if (!note.archived) {
        const archiveBtn = createButton("Archive", "btn", () =>
          archiveNote(note.id)
        );
        actionsCell.appendChild(archiveBtn);
      } else {
        const unarchiveBtn = createButton("Unarchive", "btn", () =>
          unarchiveNote(note.id)
        );
        actionsCell.appendChild(unarchiveBtn);
      }

      row.appendChild(createdCell);
      row.appendChild(contentCell);
      row.appendChild(categoryCell);
      row.appendChild(datesMentionedCell);
      row.appendChild(allDatesMentionedCell);
      row.appendChild(actionsCell);

      table.appendChild(row);
    });

    updateSummaryTable();
  } catch (error) {
    console.error("Error occurred while displaying notes:", error);
  }
}

function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener("click", onClick);
  return button;
}
