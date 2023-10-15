import z from "zod";

// Schema zur Validierung des Datens

// Benutzerdefinierte Validierungsfunktion für den Datenbank mit Regex

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/m;
const birthdayRegex = /^\d{2}-\d{2}-\d{4}$/;
//ZodValidierung

export const registerFormSchema = z
  .object({
    firstname: z
      .string({ message: "Firstname Nur String erlaubt" })
      .min(2, { message: "Firstname Minimum 2 Characters" })
      .trim()
      .toLowerCase()
      .regex(/^[A-Za-z]+$/, { message: "Firstname Nur Buchstaben erlaubt" }),
    lastname: z
      .string({ message: "Lastname Nur String erlaubt" })
      .min(2, { message: "LastName Minimum 2 Characters" })
      .trim()
      .toLowerCase()
      .regex(/^[A-Za-z]+$/, { message: "Lastname Nur Buchstaben erlaubt" }),
    username: z
      .string({ message: "Username Nur String erlaubt" })
      .min(2, { message: "Username Minimum 2 Characters" })
      .trim()
      .toLowerCase()
      .regex(/^[A-Za-z0-9]+$/, {
        message: "Username Kein Sonderzeichen erlaubt",
      }),
    birthday: z
      .string({ message: "Datetime Nur String erlaubt" })
      .regex(birthdayRegex, { message: "TT-MM-JJJJ dateformat" }), // genaue Info >>https://zod.dev/?id=basic-usage  datetime Key eingeben
    email: z
      .string({ message: "Email Nur String erlaubt" })
      .trim()
      .toLowerCase()
      .email({ message: "Ungültige Email-Adresse" })
      .regex(emailRegex, { message: "Ungültige Email-Adresse" }),
    emailConfirmation: z.string({
      required_error: "emailConfirmation is required",
    }),
    password: z
      .string({ message: "Nur String erlaubt" })
      .min(8, { message: "Minimun 8 Characters" })
      .trim()
      .regex(passwordRegex, {
        message:
          "Password >> Mindestens 8 Zeichen lang. Mindestens ein Kleinbuchstabe. Mindestens ein Großbuchstabe. Mindestens eine Ziffer ",
      }),
    passwordConfirmation: z.string({
      required_error: "passwordConfirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
  .refine((data) => data.email === data.emailConfirmation, {
    message: "Emails do not match",
    path: ["emailConfirmation"],
  });

export const emailLoginSchema = z.object({
  email: z
    .string({ message: "Email Nur String erlaubt" })
    .trim()
    .toLowerCase()
    .email({ message: "Ungültige Email-Adresse" })
    .regex(emailRegex, { message: "Ungültige Email-Adresse" }),
  password: z
    .string()
    .min(8, { message: "Password Minimun 8 Characters" })
    .trim()
    .regex(passwordRegex, {
      message:
        "Password >> Mindestens 8 Zeichen lang. Mindestens ein Kleinbuchstabe. Mindestens ein Großbuchstabe. Mindestens eine Ziffer ",
    }),
});

export const nameLoginSchema = z.object({
  username: z
    .string({ message: "Username Nur String erlaubt" })
    .min(2, { message: "Username Minimum 2 Characters" })
    .trim()
    .toLowerCase()
    .regex(/^[A-Za-z0-9]+$/, { message: "Username Kein Sonderzeichen erlaubt" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password Minimun 8 Characters" })
    .trim()
    .regex(passwordRegex, {
      message:
        "Password >> Mindestens 8 Zeichen lang. Mindestens ein Kleinbuchstabe. Mindestens ein Großbuchstabe. Mindestens eine Ziffer ",
    }),
});

export const mixLoginSchema = nameLoginSchema || emailLoginSchema;

export const updatePasswordSchema = z
  .object({
    username: z
      .string({ message: "Username Nur String erlaubt" })
      .min(2, { message: "Username Minimum 2 Characters" })
      .trim()
      .toLowerCase()
      .regex(/^[A-Za-z0-9]+$/, {
        message: "Username kein Sonderzeichen erlaubt",
      })
      .optional(),
    oldPassword: z
      .string({ message: "Password Nur String erlaubt" })
      .min(8, { message: "Password Minimun 8 Characters" })
      .trim()
      .regex(passwordRegex, {
        message:
          "Password >> Mindestens 8 Zeichen lang. Mindestens ein Kleinbuchstabe. Mindestens ein Großbuchstabe. Mindestens eine Ziffer ",
      }),
    newPassword: z
      .string({ message: "Password Nur String erlaubt" })
      .min(8, { message: "Password Minimun 8 Characters" })
      .trim()
      .regex(passwordRegex, {
        message:
          "Password >> Mindestens 8 Zeichen lang. Mindestens ein Kleinbuchstabe. Mindestens ein Großbuchstabe. Mindestens eine Ziffer ",
      }),
    newPasswordConfirmation: z.string({
      required_error: "passwordConfirmation is required",
    }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

// const loginFieldEnum = z.enum(["nickname", "email"]); // enum heißt   der value kann nur einen der beiden value sein

// export const loginFormSchema = z.object({     //  vorerst nur diese lösung   noch nicht ausprobiert
//   field: loginFieldEnum,
//   value: z.string().refine((value, data) => {
//     const { field } = data;
//     if (field === "nickname") {
//       return value
//         .min(2, { message: "minimum 2 Characters" })
//         .max(15, { message: "maximum 15 Characters" })
//         .trim()
//         .toLowerCase()
//         .refine((value) => {
//           if (!value) throw { message: "name required" };
//           return true;
//         });
//     }
//     if (field === "email") {
//       return value
//         .trim()
//         .toLowerCase()
//         .email()
//         .refine((value) => {
//           if (!value) throw { message: "email required" };
//           return true;
//         });
//     }
//     return value;
//   }),
//   password: z
//     .string()
//     .min(8, { message: "minimum 8 Characters" })
//     .trim()
//     .refine((value) => {
//       if (!value) throw { message: "password required" };
//       return validatePassword(value);
//     }),
// });
