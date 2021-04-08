import 'firebase/firestore';
import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};
export const createSite = (data) => {
  return firestore.collection('sites').add(data);
};
export const createFeedback = (data) => {
  return firestore.collection('feedback').add(data);
};
export const deleteFeedback = (id) => {
  return firestore.collection('feedback').doc(id).delete();
};
