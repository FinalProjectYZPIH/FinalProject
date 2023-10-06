import z from "zod";

// Schema zur Validierung des Datens

// Benutzerdefinierte Validierungsfunktion für den Datenbank mit Regex

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/m;

//ZodValidierung

export const registerFormSchema = z.object({
  body: z // Für die Registrungsvalidation Achtung >>  Achte auf body key vom request
    .object({
      firstname: z
        .string()
        .min(2, { message: "minimum 2 Characters" })
        .trim()
        .toLowerCase(),
      lastname: z
        .string()
        .min(2, { message: "minimum 2 Characters" })
        .trim()
        .toLowerCase(),
      username: z
        .string()
        .min(2, { message: "minimum 2 Characters" })
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
          if (!emailRegex.test(value))
            throw { message: "Ungültige Email-Adresse" };

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
          if (!passwordRegex.test(value)) {
            throw {
              message:
                "Mindestens 8 Zeichen lang \n Mindestens ein Kleinbuchstabe \n Mindestens ein Großbuchstabe \n Mindestens eine Ziffer ",
            };
          }
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
      if (!emailRegex.test(value)) throw { message: "Ungültige Email-Adresse" };

      return true;
    }),
  password: z
    .string()
    .min(8, { message: "minimun 8 Characters" })
    .trim()

});

export const nameLoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "minimum 2 Characters" })
    .trim()
    .toLowerCase()
    .optional(),
  password: z
    .string()
    .min(8, { message: "minimun 8 Characters" })
    .trim()
});

export const mixLoginSchema = nameLoginSchema || emailLoginSchema;

export const updatePasswordSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "minimum 2 Characters" })
      .trim()
      .toLowerCase()
      .optional(),
    oldPassword: z
      .string()
      .min(8, { message: "minimun 8 Characters" })
      .trim()
      .refine((value) => {
        if (!passwordRegex.test(value)) {
          throw {
            message:
              "Mindestens 8 Zeichen lang \n Mindestens ein Kleinbuchstabe \n Mindestens ein Großbuchstabe \n Mindestens eine Ziffer ",
          };
        }
        return true;
      }),
    newPassword: z
      .string()
      .min(8, { message: "minimun 8 Characters" })
      .trim()
      .refine((value) => {
        if (!passwordRegex.test(value)) {
          throw {
            message:
              "Mindestens 8 Zeichen lang \n Mindestens ein Kleinbuchstabe \n Mindestens ein Großbuchstabe \n Mindestens eine Ziffer ",
          };
        }
        return true;
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
