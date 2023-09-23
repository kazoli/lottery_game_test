import { tLotteryTicket } from '../../logics/lottery/lotteryTypes';
import ListBodyElement from './ListBodyElement';

type tProps = {
  tickets: tLotteryTicket[];
};

function ListBody(props: tProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[10px]">
      {props.tickets.map((ticket) => (
        <ListBodyElement key={ticket.id} ticket={ticket} />
      ))}
    </section>
  );
}

export default ListBody;
