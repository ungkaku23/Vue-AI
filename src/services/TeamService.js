import { http } from './HttpService';

export function updateMember(id, user) {
  return http().put(`/member/${id}`, { info: user });
}

export function addNewMember(newMember) {
  console.log("teamservice, addnew");
  return http().post("/invite/", { info: newMember })
}

export function deleteMember(id) {
  return http().delete('/member/' + id);
}

export function getAllMembers(query = '') {
  return http().get('/notes', { params: { query } });
}
