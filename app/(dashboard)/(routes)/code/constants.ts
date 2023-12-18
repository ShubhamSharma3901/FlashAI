import * as z from "zod";

export const interpretRequestMessagesSchema = z.object({
  inputCode: z.string().min(1, { message: "Code Snippet Cannot be empty" }),
});
