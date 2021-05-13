import { getAllShows } from '../../lib/db-admin';
import { auth } from '../../lib/firebase-admin';

export default async (req, res) => {
  try {
    const shows = await getAllShows();
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ error });
  }
};
