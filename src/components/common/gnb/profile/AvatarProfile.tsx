import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// 모바일 사이드바 제작 후 프로필, 텍스트 크기 조정
// 닉네임 최대 20자. truncate 설정 필요함. 너비 결정되면 추가하기
// fallback 부분은 정상 로그인됐을 시 사용될 경우가 없지만, 오류 예방을 위해 넣어둠. 전체 기능 구현 뒤 추후 삭제 예정

interface AvatarProfileProps {
  profileImg?: string | null;
  userName?: string | null;
}

const AvatarProfile = ({ profileImg = null, userName }: AvatarProfileProps) => {
  return (
    <div className='flex items-center gap-2 whitespace-nowrap'>
      <Avatar className='border-white-f1f1f5 xl:h- h-12 w-12 border-2 border-solid md:h-8 md:w-8 xl:w-8'>
        <AvatarImage src={profileImg ?? 'icon/GuestProfile.svg'} alt='프로필 이미지' />
        <AvatarFallback>GU</AvatarFallback>
      </Avatar>
      <span className='text-mogazoa-14px-400 md:text-mogazoa-14px-400 xl:text-mogazoa-18px-400'>
        {userName ?? '게스트'}
      </span>
    </div>
  );
};

export default AvatarProfile;
