import { useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';

function Operator() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  console.log(lotteryState);
  useEffect(() => {
    document.title = 'Lottery Game - Operator';
  }, []);

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>Operator</>
    </DefaultLayout>
  );
}

export default Operator;
