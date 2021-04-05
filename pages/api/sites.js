import { getAllSites } from '../../lib/db-admin';
import { database } from '../../lib/firebase-admin';

export default async (req, res) => {
  const sites = await getAllSites();
  res.status(200).json({ sites });
};
