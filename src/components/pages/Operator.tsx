import { useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';

function Operator() {
  useEffect(() => {
    document.title = 'Lottery Game - Operator';
  }, []);

  const { lotteryState } = useAppContext();

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>Operator</>
    </DefaultLayout>
  );
}

export default Operator;
