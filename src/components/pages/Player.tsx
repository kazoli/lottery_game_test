import { useState, useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import PageHeadLine from '../general/PageHeadLine';
import PlayerNamePopUp from '../player/PlayerNamePopUp';
import PlayerHeadLineSubTitle from '../player/PlayerHeadLineSubTitle';

function Player() {
  useEffect(() => {
    document.title = 'Lottery Game - Player';
  }, []);

  const { lotteryState } = useAppContext();
  const [namePopUp, setNamePopUp] = useState(false);

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>
        {namePopUp && <PlayerNamePopUp setNamePopUp={setNamePopUp} />}
        <PageHeadLine
          title={`Welcome ${lotteryState.player.name}!`}
          subTitle={<PlayerHeadLineSubTitle setNamePopUp={setNamePopUp} />}
        />
      </>
    </DefaultLayout>
  );
}

export default Player;
