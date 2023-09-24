import { useAppContext } from '../core/Context';
import ListBodyElement from './ListBodyElement';
import ListBodyEmpty from './ListBodyEmpty';

function ListBody() {
  const { lotteryState } = useAppContext();

  return lotteryState.ticketList.tickets.length ? (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[10px]">
      {lotteryState.ticketList.tickets.map((ticket) => (
        <ListBodyElement key={ticket.id} ticket={ticket} showCreator={!!lotteryState.operator.id} />
      ))}
    </section>
  ) : (
    <ListBodyEmpty />
  );
}

export default ListBody;
