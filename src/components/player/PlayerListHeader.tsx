import { lotteryPlayerListOrder } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import PlayerAddTicket from './PlayerAddTicket';
import ListOrder from '../list/ListOrder';
import ListPaginator from '../list/ListPaginator';

function PlayerListHeader() {
  const { lotteryState } = useAppContext();

  return (
    <section className="flex flex-wrap gap-[10px] justify-between mb-[10px]">
      {lotteryState.ticketList.played ? (
        <ListOrder orders={lotteryPlayerListOrder} />
      ) : (
        <PlayerAddTicket />
      )}
      <ListPaginator />
    </section>
  );
}

export default PlayerListHeader;
