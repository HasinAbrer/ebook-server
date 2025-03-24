import { generateAuthLink } from "src/controllers/auth";
import { Router } from "express";
import { z } from "zod";

const authRouter = Router();

const schema = z.object({
  email: z
    .string({
      required_error: "Email is missing!",
    })
    .email("Zod says it is Invalid!"),
});

authRouter.post(
  "/generate-link",
  (req, res, next) => {
    const { email } = req.body;
    // validate the email address
    // const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

    // if (!regex.test(email)) {
    //   // sending error response
    //   return res.status(422).json({ error: "Invalid Email!" });
    // }

    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.log(result);
      const errors = result.error.flatten().fieldErrors;
      return res.status(422).json({ errors });
    }

    result.data.email

    next();
  },
  generateAuthLink
);

export default authRouter;
