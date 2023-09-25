import { useEffect, useState } from 'react';
import { scrollToElement } from '../../../logics/general/middlewares';
import { AiOutlineUpSquare } from 'react-icons/ai';

function JumpTop() {
  const [jumpTop, setJumpTop] = useState(false);

  useEffect(() => {
    // scroll handling function
    const handleScroll = () => {
      const overLimit = window.scrollY > 200;
      // triggers setJumpTop only when previous value is changing
      overLimit !== jumpTop && setJumpTop(overLimit);
    };
    // event listener
    window.addEventListener('scroll', handleScroll);
    // cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jumpTop]);

  return (
    jumpTop && (
      <AiOutlineUpSquare
        className="fixed bottom-[15px] right-[15px] bg-[#fff] text-[2rem] text-[#467eb9] hover:text-[#ebad00] active:text-[#ebad00] shadow-[0_0_5px_1px_#467eb9] hover:shadow-[0_0_5px_1px_#ebad00] active:shadow-[0_0_5px_1px_#ebad00] opacity-30 hover:opacity-100 active:opacity-100 cursor-pointer transition-custom z-[1000] rounded-[3px]"
        title="Jump top"
        onClick={() => scrollToElement('smooth')}
      />
    )
  );
}

export default JumpTop;
