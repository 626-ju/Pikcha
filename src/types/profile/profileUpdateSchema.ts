// const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'] as const;
// const MAX_FILE_SIZE = 2 * 1024 * 1024;

import z from 'zod';

export const profileSchema = z.object({
  nickname: z
    .string()
    .nonempty('닉네임은 필수 입력입니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.'),
  description: z.string().max(300, '소개는 최대 300자까지 가능해요').optional(),
  // profile: z
  //   .instanceof(File)
  //   .optional()
  //   .refine((file) => !file || file.size <= MAX_FILE_SIZE, '파일 크기는 2MB를 넘을 수 없어요')
  //   .refine(
  //     (file) =>
  //       !file || ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]),
  //     'PNG/JPEG만 업로드 가능해요',
  //   ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
