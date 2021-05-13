import { compareDesc, parseISO } from 'date-fns';

import { database } from './firebase-admin';

export const getUserShowFeedback = async (showId, userId) => {
  try {
    const snapshot = await database
      .collection('feedback')
      .where('showId', '==', showId)
      .where('authorId', '==', userId)
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
export const getActiveFeedback = async (showId) => {
  try {
    const snapshot = await database
      .collection('feedback')
      .where('showId', '==', showId)
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

export const getAllShows = async () => {
  try {
    const snapshot = await database
      .collection('shows')
      .where('status', '==', 'active')
      .get();
    const shows = [];

    snapshot.forEach((doc) => {
      shows.push({ id: doc.id, ...doc.data() });
    });

    return { shows };
  } catch (error) {
    return { error };
  }
};

export const getShow = async (showId) => {
  try {
    const doc = await database.collection('shows').doc(showId).get();

    const show = { id: doc.id, ...doc.data() };
    return { show };
  } catch (error) {
    return { error };
  }
};
export const getUserShows = async (userId) => {
  try {
    const snapshot = await database
      .collection('shows')
      .where('authorId', '==', userId)
      .get();

    const shows = [];

    snapshot.forEach((doc) => {
      shows.push({ id: doc.id, ...doc.data() });
    });

    return { shows };
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
