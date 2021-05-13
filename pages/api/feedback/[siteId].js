import { getUserSiteFeedback, getSite } from '../../../lib/db-admin';
import { auth } from '../../../lib/firebase-admin';

export default async (req, res) => {
  const siteId = req.query.siteId;
  const { uid } = await auth.verifyIdToken(req.headers.token);

  const { feedback, error } = await getUserSiteFeedback(siteId, uid);
  const { site } = await getSite(siteId);
  if (error) {
    res, status(500).json({ error });
  }
  res.status(200).json({ feedback, site });
};
