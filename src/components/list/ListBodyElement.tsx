import { tLotteryTicket } from '../../logics/lottery/lotteryTypes';
import { settings } from '../../logics/general/initialStates';
import { formatDate } from '../../logics/general/middlewares';
import ListBodyElementBlock from './ListBodyElementBlock';
import TicketNumber from '../general/TicketNumber';

type tProps = {
  ticket: tLotteryTicket;
};

function ListBodyElement(props: tProps) {
  return (
    <div className="p-[10px] shadow-[0_0_0_1px_#d0d0d0] rounded-[3px]">
      <ListBodyElementBlock label="Player" children={props.ticket.playerId} />
      <ListBodyElementBlock
        label="Created"
        children={formatDate(settings.userDateFormat, props.ticket.created)}
      />
      <ListBodyElementBlock label="Played" children={props.ticket.played ? 'Yes' : 'No'} />
      <ListBodyElementBlock label="Matches" children={props.ticket.matches.toString()} />
      <ListBodyElementBlock label="Numbers">
        <div className="flex flex-wrap gap-[10px] mt-[2px]">
          {props.ticket.numbers.map((number) => (
            <TicketNumber
              key={number.value}
              extraClass="min-w-[1.5rem] flex-1"
              number={number.value}
              selected={number.match}
            />
          ))}
        </div>
      </ListBodyElementBlock>
    </div>
  );
}

export default ListBodyElement;
