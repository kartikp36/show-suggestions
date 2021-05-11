import { getAllSites } from '../../lib/db-admin';
import { auth } from '../../lib/firebase-admin';

export default async (req, res) => {
  try {
    const sites = await getAllSites();
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error });
  }
};
