const noteService = require("../service/note.service");

/* ---------- CREATE NOTE ---------- */
exports.create = async (req, res) => {
  try {
    const {author_id, ...data} = req.body; 
    const note = await noteService.createNote(author_id, data);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------- GET NOTES ---------- */
exports.getAll = async (req, res) => {
  try {
    const authorId = req.query.author_id || req.user.id;
    const notes = await noteService.getNotes(authorId);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------- UPDATE NOTE ---------- */
exports.update = async (req, res) => {
  try {
    const {author_id, ...data} = req.body
    await noteService.updateNote(
      req.params.id,
      req.body.author_id,
      data
    );
    res.json({ message: "Note updated" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

/* ---------- DELETE NOTE ---------- */
exports.remove = async (req, res) => {
  try {
    await noteService.deleteNote(req.params.id, req.body.author_id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
