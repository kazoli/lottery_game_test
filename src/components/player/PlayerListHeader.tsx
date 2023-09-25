import { lotteryPlayerListOrder } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import PlayerAddTicket from './PlayerAddTicket';
import ListTotalResults from '../list/ListTotalResults';
import ListOrder from '../list/ListOrder';
import ListPaginator from '../list/ListPaginator';

function PlayerListHeader() {
  const { lotteryState } = useAppContext();

  return (
    <section className="list-control-header">
      <div className="flex flex-wrap gap-[10px]">
        <ListTotalResults />
        {lotteryState.ticketList.played ? (
          <ListOrder orders={lotteryPlayerListOrder} />
        ) : (
          <PlayerAddTicket />
        )}
      </div>
      <ListPaginator />
    </section>
  );
}

export default PlayerListHeader;
