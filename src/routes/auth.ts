import { generateAuthLink } from "src/controllers/auth";
import { emailValidationSchema, validate } from "src/middlewares/validator";
import { Router } from "express";

const authRouter = Router();

authRouter.post(
  "/generate-link",
  validate(emailValidationSchema),
  generateAuthLink
);

export default authRouter;
