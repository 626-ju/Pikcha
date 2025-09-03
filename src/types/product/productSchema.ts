import z from 'zod';

export const productSchema = z.object({
  productId: z.number().optional(),
  name: z
    .string()
    .nonempty('작품 제목은 필수 입력입니다.')
    .max(20, '작품 이름은 최대 20자까지 가능합니다.'),
  description: z
    .string()
    .max(500, '내용은 최대 500자까지 가능합니다.')
    .min(10, '최소 10자 이상 적어주세요.')
    .nonempty('작품 설명은 필수입니다.'),
  image: z.array(z.string()).nonempty('대표 이미지를 추가해주세요.'),
  categoryId: z.number({ message: '카테고리를 선택해주세요.' }),
});

export type ProductFormValue = z.infer<typeof productSchema>;
