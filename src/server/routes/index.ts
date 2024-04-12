import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/user", UserController.getAllUsers);
router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.registerUser);
router.put("/user/:id", UserController.UpdateUser);
router.delete("/user/:id", UserController.DeleteUser);

export default router;
