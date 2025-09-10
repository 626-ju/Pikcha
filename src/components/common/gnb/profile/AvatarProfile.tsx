import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// fallback 부분은 정상 로그인됐을 시 사용될 경우가 없지만, 오류 예방을 위해 넣어둠. 전체 기능 구현 뒤 추후 삭제 예정

interface AvatarProfileProps {
  profileImg?: string | null;
  userName?: string | null;
}

const AvatarProfile = ({ profileImg = null, userName }: AvatarProfileProps) => {
  return (
    <div className='flex items-center gap-4 whitespace-nowrap md:gap-2'>
      <Avatar
        className={`h-10 w-10 md:h-7 md:w-7 xl:h-8 xl:w-8 ${
          profileImg ? 'border-white-f1f1f5 border-2 border-solid' : ''
        }`}
      >
        <AvatarImage src={profileImg ?? '/images/guestProfile.png'} alt='프로필 이미지' />
        <AvatarFallback>게스트</AvatarFallback>
      </Avatar>
      <span
        className='text-mogazoa-18px-400 md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 max-w-45 truncate md:max-w-22'
        title={userName ?? '게스트'}
      >
        {userName ?? '게스트'}
      </span>
    </div>
  );
};

export default AvatarProfile;
