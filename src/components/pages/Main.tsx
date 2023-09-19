import { useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';

function Main() {
  useEffect(() => {
    document.title = 'Lottery Game';
  }, []);

  const { lotteryState } = useAppContext();

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>Main</>
    </DefaultLayout>
  );
}

export default Main;
