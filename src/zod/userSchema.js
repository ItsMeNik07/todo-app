import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(3, "Must have a length of 3").regex(/^[A-Za-z]*$/,"Only alphabets are allowed"),
  lastName: z.string().min(3, "Must have a length of 3").regex(/^[A-Za-z]*$/,"Only alphabets are allowed"),
  email: z.string().email("Invalid email address"),
  password: z.string().regex(  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password: 8+, A-Z, a-z, 0-9, special"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // sets the error on confirmPassword field
});
