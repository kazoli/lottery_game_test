import { tLotteryTicket } from '../../logics/lottery/lotteryTypes';
import { settings } from '../../logics/general/initialStates';
import { formatDate } from '../../logics/general/middlewares';
import ListBodyElementBlock from './ListBodyElementBlock';
import TicketNumber from '../general/TicketNumber';

type tProps = {
  ticket: tLotteryTicket;
  showCreator: boolean;
};

function ListBodyElement(props: tProps) {
  return (
    <div className="p-[10px] shadow-[0_0_0_1px_#d0d0d0] bg-gradient-to-b from-[#f7fbff] to-[#fff] rounded-[3px]">
      {props.showCreator && (
        <ListBodyElementBlock
          label="Creator"
          children={props.ticket.playerId ? 'Player' : 'Auto'}
        />
      )}
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
