import { database } from './firebase-admin';

export const getAllFeedback = async (siteId) => {
  const snapshot = await database
    .collection('feedback')
    .where('siteId', '==', siteId)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  return feedback;
};

export const getAllSites = async () => {
  const snapshot = await database.collection('sites').get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return sites;
};
