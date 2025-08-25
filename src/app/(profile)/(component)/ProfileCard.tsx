import FollowerModalTrigger from './FollowModalTrigger';
import FollowTrigger from './FollowTrigger';

interface Props {
  userid?: string;
}

const ProfileCard = ({ userid }: Props) => {
  //{teamId}/users/me ,{teamId}/users/{userid}서버액션으로 데이터 가져와서 데이터 채우기

  const nickname = '성주';
  const description =
    '세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도 프로쇼핑러! 안녕하세요, 별점의 화신 surisuri마수리입니다!';

  const isFollowing = false;

  return (
    <div className='relative flex w-[335px] flex-col items-center gap-7.5 rounded-[12px] border-[var(--color-black-353542)] bg-[var(--color-black-252530)] px-5 py-7.5 md:w-[509px] md:px-7.5 xl:h-[634px] xl:w-[340px] xl:gap-10 xl:px-5 xl:py-10'>
      {/* 추후에 지우겠습니다.(린트 회피용) */}
      <div className='sr-only'>{userid}</div>
      {/* 오버레이 */}
      <div
        className='absolute inset-0 h-full w-full bg-center opacity-20 blur-2xl'
        style={{ backgroundImage: "url('/images/profile-overay.jpg')" }}
      />
      {/* 추후 이미지로 변경 
        <Image src={user.image} size={120}>
      */}
      <div className='h-30 w-30 rounded-full bg-amber-500 xl:h-45 xl:w-45' />
      <div className='flex flex-col items-center justify-between gap-2.5 xl:gap-5'>
        <h2 className='text-mogazoa-20px-600 md:text-mogazoa-24px-600 text-[var(--color-white-f1f1f5)]'>
          {nickname}
        </h2>
        <p className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400 break-words text-[var(--color-gray-6e6e82)]'>
          {description}
        </p>
      </div>
      <FollowerModalTrigger />
      <FollowTrigger isFollowing={isFollowing} />
    </div>
  );
};

export default ProfileCard;
