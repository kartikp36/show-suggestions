import { getActiveFeedback, getShow } from '../../../../lib/db-admin';

export default async (req, res) => {
  const showId = req.query.showId;

  const { feedback, error } = await getActiveFeedback(showId);
  const { show } = await getShow(showId);
  if (error) {
    res, status(500).json({ error });
  }
  res.status(200).json({ feedback, show });
};
