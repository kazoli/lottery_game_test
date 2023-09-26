import { useEffect } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotteryPlayerListOrder } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import ContentLoading from '../general/ContentLoading';
import PlayerHeadLine from '../player/PlayerHeadLine';
import PlayerDashboard from '../player/PlayerDashboard';
import ListBody from '../list/ListBody';
import ListFooter from '../list/ListFooter';
import ListBodyEmpty from '../list/ListBodyEmpty';
import ListHeader from '../list/ListHeader';

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
      {lotteryState.player.id ? (
        <>
          <PlayerHeadLine />
          <PlayerDashboard />
          {lotteryState.ticketList.tickets.length ? (
            <>
              <ListHeader order={lotteryPlayerListOrder} />
              <ListBody />
              <ListFooter />
            </>
          ) : (
            <ListBodyEmpty />
          )}
        </>
      ) : (
        <ContentLoading />
      )}
    </DefaultLayout>
  );
}

export default Player;
