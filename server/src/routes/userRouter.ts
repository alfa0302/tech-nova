import { getAuth } from "@clerk/express";
import { Router } from "express";
import { getLocalUser } from "../lib/users";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await getLocalUser(userId);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
