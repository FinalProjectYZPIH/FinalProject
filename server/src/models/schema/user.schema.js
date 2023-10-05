import z from "zod";

// Schema zur Validierung des Datens

// Benutzerdefinierte Validierungsfunktion für den Datenbank mit Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

//ZodValidierung

export const registerFormSchema = z.object({
  body: z // Für die Registrungsvalidation Achtung >>  Achte auf body key vom request
    .object({
      firstname: z
        .string()
        .min(2, { message: "minimum 2 Characters" })
        .max(15, { message: "maximun 15 Characters" })
        .trim()
        .toLowerCase()
        .refine((value) => {
          if (!value) throw { message: "name required" };
          return true;
        }),
      lastname: z
        .string()
        .min(2, { message: "minimum 2 Characters" })
        .max(15, { message: "maximun 15 Characters" })
        .trim()
        .toLowerCase()
        .refine((value) => {
          if (!value) throw { message: "name required" };
          return true;
        }),
        username: z
        .string()
        .min(2, { message: "minimum 2 Characters" })
        .max(15, { message: "maximun 15 Characters" })
        .trim()
        .toLowerCase()
        .optional(),
      dateTime: z
        .string()
        .datetime({ message: "Invalid datetime string! Must be UTC." }), // genaue Info >>https://zod.dev/?id=basic-usage  datetime Key eingeben
      email: z
        .string()
        .trim()
        .toLowerCase()
        .email()
        .refine((value) => {
          if (validateEmail(value)) throw { message: "Ungültige Email-Adresse" };

          return true;
        }),
      emailConfirmation: z.string({
        required_error: "passwordConfirmation is required",
      }),
      password: z
        .string()
        .min(8, { message: "minimun 8 Characters" })
        .trim()
        .refine((value) => {
          if (validatePassword(value)) throw { message: "Mindestens 8 Zeichen lang \n Mindestens ein Kleinbuchstabe \n Mindestens ein Großbuchstabe \n Mindestens eine Ziffer \n Mindestens ein Sonderzeichen (z. B. @$!%*?&)" };
          return true;
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
    }),
});


export const emailLoginSchema = z.object({
  email: z
  .string()
  .trim()
  .toLowerCase()
  .email()
  .refine((value) => {
    if (validateEmail(value)) throw { message: "Ungültige Email-Adresse" };

    return true;
  }),
  password: z
  .string()
  .min(8, { message: "minimun 8 Characters" })
  .trim()
  .refine((value) => {
    if (!value) throw { message: "password required" };
    return validatePassword(value);
  }),
});

export const nameLoginSchema = z.object({
  username: z
  .string()
  .min(2, { message: "minimum 2 Characters" })
  .max(15, { message: "maximun 15 Characters" })
  .trim()
  .toLowerCase()
  .refine((value) => {
    if (!value) throw { message: "name required" };
    return true;
  }),
  password: z
  .string()
  .min(8, { message: "minimun 8 Characters" })
  .trim()
  .refine((value) => {
    if (!value) throw { message: "password required" };
    return validatePassword(value);
  }),
});


export const mixLoginSchema = nameLoginSchema || emailLoginSchema;




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