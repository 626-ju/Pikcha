import { z } from 'zod';

// 로그인 스키마
const singinSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  password: z.string().min(8, { message: '비밀번호는 8자리 이상이어야 합니다.' }),
});

// 회원가입 스키마
const signupSchema = z
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
  });

type LoginFormValues = z.infer<typeof singinSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export { singinSchema, signupSchema };
export type { LoginFormValues, SignupFormValues };
