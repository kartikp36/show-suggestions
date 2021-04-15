import { compareDesc, parseISO } from 'date-fns';

import { database } from './firebase-admin';

export const getAllSiteFeedback = async (siteId) => {
  try {
    const snapshot = await database
      .collection('feedback')
      .where('siteId', '==', siteId)
      .where('status', 'in', ['pending', 'active'])
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
};
export const getActiveFeedback = async (siteId) => {
  try {
    const snapshot = await database
      .collection('feedback')
      .where('siteId', '==', siteId)
      .where('status', '==', 'active')
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
};

export const getAllSites = async () => {
  try {
    const snapshot = await database.collection('sites').get();
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
};

export const getSite = async (siteId) => {
  try {
    const doc = await database.collection('sites').doc(siteId).get();

    const site = { id: doc.id, ...doc.data() };
    return { site };
  } catch (error) {
    return { error };
  }
};
export const getUserSites = async (userId) => {
  try {
    const snapshot = await database
      .collection('sites')
      .where('authorId', '==', userId)
      .get();

    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
};
export const getUserFeedback = async (userId) => {
  try {
    const snapshot = await database
      .collection('feedback')
      .where('authorId', '==', userId)
      .where('status', 'in', ['pending', 'active'])
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
};
