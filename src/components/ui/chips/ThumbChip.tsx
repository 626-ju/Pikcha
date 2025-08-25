'use client';

import { useState } from 'react';

import ThumbsDownIcon from '@/../public/icon/Icon-thumbsdown.svg';
import ThumbsUpIcon from '@/../public/icon/Icon-thumbsup.svg';

const ThumbChip = ({ onClick, initialCount }: { onClick?: () => void; initialCount: number }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [count, setCount] = useState<number>(initialCount);

  const handleToggleThumbs = async () => {
    const newToggle = !toggle;
    const newCount = newToggle ? count + 1 : count - 1;

    setToggle(newToggle);
    setCount(newCount);

    try {
      await onClick?.();
    } catch (error) {
      console.log(error);
      setToggle(toggle);
      setCount(count);
    }
  };

  return (
    <button type='button' onClick={handleToggleThumbs}>
      {toggle ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
      <p>{count}</p>
    </button>
  );
};
export default ThumbChip;
