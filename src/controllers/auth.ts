import { Request, Response, RequestHandler } from "express";
import crypto from 'crypto'
import VerificationTokenModel from "src/models/verificationToken";
import UserModel from "src/models/user";

export const generateAuthLink: RequestHandler = async (req, res) => {
  // Generate authentication link
  // and send the link to the users email address

    /*
    1. Generate Unique token for every users
    2. Store that token securely inside the database
       so that we can validate it in future.
    3. Create a link which include that secure token and user information
    4. Send that link to users email address.
    5. Notify user to look inside the email to get the login link
  */

    const {email} = req.body
    let user =  await UserModel.findOne({email});
    if(!user) {
      // if no user found create new user
      user = await UserModel.create({email})
    }

    const userId = user._id.toString()

    // if we already have token for this user it will remove that first
    await VerificationTokenModel.findOneAndDelete({userId})

  const randomToken = crypto.randomBytes(36).toString("hex")

  await VerificationTokenModel.create<{userId: string}>({
    userId,
    token: randomToken,
  })

  res.json({ ok: true });
};
