import { useMemo } from 'react';
import { useAppContext } from '../core/Context';
import PlayerAddTicket from './PlayerAddTicket';
import PlayerListOrder from './PlayerListOrder';

function PlayerListHeader() {
  const { lotteryState } = useAppContext();

  // if any ticket played, then all tickets were also played
  const playedTickets = useMemo(
    () => !lotteryState.player.tickets.find((ticket) => ticket.played),
    [lotteryState.player.tickets],
  );

  return (
    <section className="flex flex-wrap mb-[15px]">
      {playedTickets ? <PlayerAddTicket /> : <PlayerListOrder />}
    </section>
  );
}

export default PlayerListHeader;
