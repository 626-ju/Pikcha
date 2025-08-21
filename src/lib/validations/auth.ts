import { z } from 'zod';

const loginSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
    password: z.string().min(8, { message: '비밀번호는 8자리 이상이어야 합니다.' }),
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해주세요.' })
      .max(10, { message: '닉네임은 최대 10자까지 입력 가능합니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.confirmPassword.length >= 8, {
    message: '비밀번호는 8자리 이상이어야 합니다.',
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginFormValues };
