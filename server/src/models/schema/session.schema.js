import z from "zod";


export const SessionSchema = z.object({
  UserInfo: z.object({
    id: z.string(),
    email: z.string({
      required_error: "Email is required",
    }).email(),
    role: z.enum(["member", "admin"]).optional(),
    session: z.string()
  })
});



