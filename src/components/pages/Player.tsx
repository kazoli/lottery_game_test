import { useEffect } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import PlayerListHeader from '../player/PlayerListHeader';
import PlayerHeadLine from '../player/PlayerHeadLine';
import ListBody from '../list/ListBody';
import ListBodyEmpty from '../list/ListBodyEmpty';

function Player() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  useEffect(() => {
    document.title = 'Lottery Game - Player';
    // initialize player data
    lotteryDispatch({
      type: tLotteryActionTypes.lotterySetPlayer,
    });
    // clean up player data
    return () => {
      lotteryDispatch({
        type: tLotteryActionTypes.lotteryUnsetPlayer,
      });
    };
  }, [lotteryDispatch]);

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      <>
        <PlayerHeadLine />
        <PlayerListHeader />
        {lotteryState.player.tickets.length ? <ListBody /> : <ListBodyEmpty />}
      </>
    </DefaultLayout>
  );
}

export default Player;
