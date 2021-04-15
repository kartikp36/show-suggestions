import { getAllSites } from '../../../lib/db-admin';

export default async (req, res) => {
  try {
    const { site } = await getAllSites();

    res.status(200).json({ site });
  } catch (error) {
    res.status(500).json({ error });
  }
};
