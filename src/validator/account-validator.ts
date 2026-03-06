import { z } from "zod";

import { ApiError } from "@/errors";

const createUserSchema = z.object({
  password: z.string().min(8),
  username: z.string().min(4),
});

type CreateUser = z.infer<typeof createUserSchema>;

export class AccountValidator {
  public static create(account: CreateUser) {
    const result = createUserSchema.safeParse(account);
    if (!result.success) throw new ApiError(z.prettifyError(result.error), 400);
  }
}
