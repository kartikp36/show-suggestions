import { getAllSiteFeedback, getSite } from '../../../lib/db-admin';

export default async (req, res) => {
  const siteId = req.query.siteId;

  const { feedback, error } = await getAllSiteFeedback(siteId);
  const { site } = await getSite(siteId);
  if (error) {
    res, status(500).json({ error });
  }
  res.status(200).json({ feedback, site });
};
