import { getShow } from '../../../lib/db-admin';

export default async (req, res) => {
  try {
    const { showId } = req.query;
    const { show } = await getShow(showId);

    res.status(200).json({ show });
  } catch (error) {
    res.status(500).json({ error });
  }
};
