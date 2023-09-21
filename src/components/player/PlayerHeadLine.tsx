import { useState } from 'react';
import { useAppContext } from '../core/Context';
import PageHeadLine from '../general/PageHeadLine';
import PlayerNamePopUp from './PlayerNamePopUp';

function PlayerHeadLine() {
  const { lotteryState } = useAppContext();
  const [namePopUp, setNamePopUp] = useState(false);
  const subTitle = (
    <>
      You can change your name if you{' '}
      <span className="link" onClick={() => setNamePopUp(true)}>
        click here
      </span>
      .
    </>
  );

  return (
    <>
      {namePopUp && <PlayerNamePopUp setNamePopUp={setNamePopUp} />}
      <PageHeadLine title={`Welcome ${lotteryState.player.name}!`} subTitle={subTitle} />
    </>
  );
}

export default PlayerHeadLine;
