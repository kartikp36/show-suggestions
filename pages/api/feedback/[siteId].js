import { getUserShowFeedback, getShow } from '../../../lib/db-admin';
import { auth } from '../../../lib/firebase-admin';

export default async (req, res) => {
  const showId = req.query.showId;
  const { uid } = await auth.verifyIdToken(req.headers.token);

  const { feedback, error } = await getUserShowFeedback(showId, uid);
  const { show } = await getShow(showId);
  if (error) {
    res, status(500).json({ error });
  }
  res.status(200).json({ feedback, show });
};
