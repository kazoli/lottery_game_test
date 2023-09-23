import { useAppContext } from '../core/Context';
import PlayerAddTicket from './PlayerAddTicket';
import PlayerListOrder from './PlayerListOrder';

function PlayerListHeader() {
  const { lotteryState } = useAppContext();

  return (
    <section className="flex flex-wrap mb-[15px]">
      {!lotteryState.player.addTicket ? <PlayerAddTicket /> : <PlayerListOrder />}
    </section>
  );
}

export default PlayerListHeader;
