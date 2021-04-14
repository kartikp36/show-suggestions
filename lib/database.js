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
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
};
export const deleteSite = async (id) => {
  firestore.collection('sites').doc(id).delete();

  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
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
