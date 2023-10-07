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
          subTitle="You can go to the player or operator page of the game"
        />
        <div>
          <Link to="/player" className="link text-[1.25rem]">
            Player
          </Link>
        </div>
        <div className="mt-[10px]">
          <Link to="/operator" className="link text-[1.25rem]">
            Operator
          </Link>
        </div>
      </>
    </DefaultLayout>
  );
}

export default Main;
