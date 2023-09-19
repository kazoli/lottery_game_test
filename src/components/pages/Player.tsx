import { useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';

function Player() {
  useEffect(() => {
    document.title = 'Lottery Game';
  }, []);

  const { lotteryState } = useAppContext();

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>Player</>
    </DefaultLayout>
  );
}

export default Player;
