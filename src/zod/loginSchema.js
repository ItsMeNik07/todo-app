import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
  password: z.string().regex(  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password: 8+, A-Z, a-z, 0-9, special")
});