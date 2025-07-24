import { z } from 'zod';

export const todoSchema = z.object({
    title : z.string().min(3,"Must have length of 3 characters"),
    description : z.string().min(5,"Must have length of 5 characters"),
    date: z.string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .refine(val => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0,0,0,0); // remove time portion

      // Check if parsed date is valid and not in the past
      const year = selectedDate.getFullYear();

      // Check if parsed date is valid, not in past, and year is within range
      return !isNaN(selectedDate) &&
             selectedDate >= today &&
             year >= 2025 &&
             year <= 2030;
    }, {
      message: "Date not in past and b/w 2025-30"
    })
})