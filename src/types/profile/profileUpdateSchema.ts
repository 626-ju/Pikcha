// const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'] as const;
// const MAX_FILE_SIZE = 5 * 1024 * 1024;

import z from 'zod';

export const profileSchema = z.object({
  nickname: z
    .string()
    .nonempty('닉네임은 필수 입력입니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.'),
  description: z.string().max(300, '소개는 최대 300자까지 가능해요').optional(),
  image: z
    .string()
    // .instanceof(File)
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
