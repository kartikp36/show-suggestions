import 'firebase/firestore';
import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};
export const createShow = (data) => {
  const show = firestore.collection('shows').doc();
  show.set(data);
  return show;
};
export const deleteShow = async (id) => {
  return firestore.collection('shows').doc(id).update({ status: 'removed' });
};

export const createFeedback = (data) => {
  return firestore.collection('feedback').add(data);
};
export const deleteFeedback = (id) => {
  return firestore.collection('feedback').doc(id).update({ status: 'removed' });
};
export const updateFeedback = (id, newValues) => {
  return firestore.collection('feedback').doc(id).update(newValues);
};
