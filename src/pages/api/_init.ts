import { init } from "blog/utils/init";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  void init();

  res.status(200).json({});
}
