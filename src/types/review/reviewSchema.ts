import z from 'zod';

export const postReviewSchema = z.object({
  content: z
    .string()
    .max(300, '리뷰내용은 최대 300자까지 가능합니다.')
    .min(10, '최소 10자 이상 적어주세요.')
    .nonempty('리뷰 내용을 입력해주세요.'),
  rating: z.number().min(1, '별점으로 작품을 평가해주세요.'),
  images: z.array(z.string()).optional(),
});

export type PostReviewFormValue = z.infer<typeof postReviewSchema>;

// 리팩토링 할 수도 있어서 분리해놓음
export const patchReviewSchema = z.object({
  content: z
    .string()
    .max(300, '리뷰내용은 최대 300자까지 가능합니다.')
    .min(10, '최소 10자 이상 적어주세요.')
    .nonempty('리뷰 내용을 입력해주세요.'),
  rating: z.number().min(1, '별점으로 작품을 평가해주세요.'),
  images: z.array(z.string()).optional(),
});

export type PatchReviewFormValue = z.infer<typeof patchReviewSchema>;
