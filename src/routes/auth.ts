import { generateAuthLink } from "src/controllers/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post( 
  "/generate-link",
  (req, res, next) => {
    const { email } = req.body;
    // hasinjunior12@gmail.com (validate the email address)
    const regex = new RegExp("^[a-z0-9]+[a-z0-9._]*@gmail.com$");

    if (!regex.test(email)) {
      // sending error response
      return res.status(422).json({ error: "Invalid Email!" });
    }

    next();
  },
  generateAuthLink
);

export default authRouter;
