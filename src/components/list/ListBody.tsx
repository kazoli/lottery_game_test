import { useAppContext } from '../core/Context';
import ListBodyElement from './ListBodyElement';

function ListBody() {
  const { lotteryState } = useAppContext();

  const viewStyle =
    lotteryState.ticketList.listView === 'grid'
      ? 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'
      : '';

  return (
    <section className={`grid gap-[10px] ${viewStyle}`}>
      {lotteryState.ticketList.tickets.map((ticket) => (
        <ListBodyElement key={ticket.id} ticket={ticket} showCreator={!lotteryState.player.id} />
      ))}
    </section>
  );
}

export default ListBody;
