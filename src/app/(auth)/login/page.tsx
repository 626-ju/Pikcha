import Input from '@/components/Input';

const LoginPage = () => {
  return (
    <div
      className='flex flex-col 
      px-[20px] py-[30px] justify-between m-auto
      md:px-[152px] md:py-[181px] md:gap-[60px] md:justify-center
      lg:px-[640px] lg:py-[90px]'
    >
      <div
        className='flex flex-col 
        gap-[30px]
        md:gap-10'
      >
        <Input type='email' label='이메일' placeholder='이메일을 입력해주세요' />
        <Input type='password' label='비밀번호' placeholder='비밀번호를 입력해주세요' />
        <Input
          type='text'
          label='닉네임'
          placeholder='닉네임을 입력해주세요'
          errorMessage='닉네임을 입력해주세요'
        />
      </div>
      <button className='border'>가입하기</button>
    </div>
  );
};

export default LoginPage;
