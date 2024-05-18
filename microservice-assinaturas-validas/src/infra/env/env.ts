import { z } from 'zod'

export const envSchema = z.object({
  REDIS_HOST: z.string().optional().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_DB: z.coerce.number().optional().default(1),
})

export type Env = z.infer<typeof envSchema>