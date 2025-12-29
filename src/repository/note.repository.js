const Note = require("../models/Note");

class NoteRepository {

  create(data) {
    return Note.create(data);
  }

  findByAuthor(authorId) {
    return Note.findAll({
      where: { author_id: authorId },
      order: [
        ["noteDate", "DESC"],
        ["startTime", "ASC"]
      ]
    });
  }

  findById(id) {
    return Note.findByPk(id);
  }

  update(id, data) {
    return Note.update(data, { where: { id } });
  }

  delete(id) {
    return Note.destroy({ where: { id } });
  }
}

module.exports = new NoteRepository();
