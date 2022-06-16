import { http } from './HttpService';

function updateNote(id, note) {
  return http().put('/notes/' + id, note);
}
function addNote(note) {
  return http().post('/notes', note);
}
function deleteNote(id) {
  return http().delete('/notes/' + id);
}
function getAllNotes(query = '') {
  return http().get('/notes', { params: { query } });
}

const NoteService = {
  addNote,
  updateNote,
  deleteNote,
  getAllNotes,
};

export default NoteService;
