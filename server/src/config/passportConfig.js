import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await UserModel.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = new UserModel({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            username: profile.username,
            googleId: profile.id,
            avatarImage: profile.photos[0].value,

            // andere befehle hinzufügen
          });

          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
