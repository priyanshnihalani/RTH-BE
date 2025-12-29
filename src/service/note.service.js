const noteRepo = require("../repository/note.repository");

class NoteService {

  createNote(authorId, data) {
    return noteRepo.create({
      ...data,
      author_id: authorId
    });
  }

  getNotes(authorId) {
    return noteRepo.findByAuthor(authorId);
  }

  async updateNote(noteId, authorId, data) {
    const note = await noteRepo.findById(noteId);
    if (!note) throw new Error("Note not found");

    if (note.author_id !== authorId) {
      throw new Error("Unauthorized");
    }

    await noteRepo.update(noteId, data);
  }

  async deleteNote(noteId, authorId) {
    const note = await noteRepo.findById(noteId);
    if (!note) throw new Error("Note not found");

    if (note.author_id !== authorId) {
      throw new Error("Unauthorized");
    }

    await noteRepo.delete(noteId);
  }
}

module.exports = new NoteService();
