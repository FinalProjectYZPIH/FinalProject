import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import logger from "../helpers/middleware/logger.js";
import passport from "passport";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" 
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile)
      // console.log(profile.displayName.split(" ").join(""))
      // console.log(email)
      try {
        const existingUser = await UserModel.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = new UserModel({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            username: profile.displayName.split(" ").join("").toLowerCase(),
            googleId: profile.id,
            avatarImage: profile.photos[0].value,

            // andere befehle hinzufügen
          });

          await newUser.save();
          return done("User isn't created", newUser);
        }
      } catch (err) {
        logger.error(err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done("SerializeUser not working", user);
});

passport.deserializeUser((user, done) => {
  done("DeserializeUser not working", user);
});

export default passport;
