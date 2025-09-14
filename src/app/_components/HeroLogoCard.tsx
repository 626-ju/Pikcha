const HeroLogoCard = () => {
  return (
    <video className='h-full w-full object-cover' autoPlay muted loop playsInline>
      <source src='/images/PikchaLogoAnimation.webm' type='video/webm'></source>
      <source src='/images/PikchaLogoAnimation.mp4' type='video/mp4'></source>
    </video>
  );
};

export default HeroLogoCard;
