import { useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import PageHeadLine from '../general/PageHeadLine';

function Main() {
  useEffect(() => {
    document.title = 'Lottery Game';
  }, []);

  const { lotteryState } = useAppContext();

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>
        <PageHeadLine
          title="Welcome to the lottery game!"
          subTitle="Please select if you would like to be a player or an operator."
        />
        <Link to="/player" className="link main-link mt-[20px]">
          Player
        </Link>
        <Link to="/operator" className="link main-link mt-[10px]">
          Operator
        </Link>
      </>
    </DefaultLayout>
  );
}

export default Main;
