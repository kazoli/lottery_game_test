import { useMemo } from 'react';
import { useAppContext } from '../core/Context';
import ListBodyElement from './ListBodyElement';

function ListBody() {
  const { lotteryState } = useAppContext();

  const viewStyle =
    lotteryState.ticketList.listView === 'grid'
      ? 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'
      : '';

  const listBody = useMemo(
    () =>
      lotteryState.ticketList.tickets.map((ticket) => (
        <ListBodyElement key={ticket.id} ticket={ticket} showCreator={!lotteryState.player.id} />
      )),
    [lotteryState.ticketList.tickets, lotteryState.player.id],
  );

  return <section className={`grid gap-[10px] ${viewStyle}`}>{listBody}</section>;
}

export default ListBody;
