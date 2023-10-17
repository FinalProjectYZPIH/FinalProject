import z from "zod";


export const cookieSessionSchema = z.object({
  UserInfo: z.object({
    id: z.string(),
    email: z.string().email(),
    role: z.enum(["member", "admin"]).default("member"),
    session: z.string(), // maybe another infos needed to add?
    // Ein Zod-Schema für die Uhrzeit im HH:MM-Format
    // darkModeTime: z.string().regex(/^\d{2}:\d{2}$/),  nicht nötig
  })
});



