import z from 'zod';

export const reviewSchema = z.object({
  content: z
    .string()
    .max(300, '리뷰내용은 최대 300자까지 가능합니다.')
    .min(10, '최소 10자 이상 적어주세요.')
    .nonempty('리뷰 내용을 입력해주세요.'),
  rating: z.number({ message: '별점으로 작품을 평가해주세요.' }),
  image: z.array(z.string()).optional(),
});

export type ProductFormValue = z.infer<typeof reviewSchema>;
