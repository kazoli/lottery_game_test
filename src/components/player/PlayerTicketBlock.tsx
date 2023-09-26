import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { toast } from 'react-toastify';
import TicketNumber from '../general/TicketNumber';

type tProps = {
  numbers: number[];
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
};

function PlayerTicketBlock(props: tProps) {
  const ticketNumbers = [];
  const selectAction = (selected: boolean, i: number) => {
    props.setNumbers((prevData) => {
      if (selected) {
        return prevData.filter((data) => data !== i);
      } else {
        if (prevData.length === lotterySettings.ticketMaxNumbers) {
          toast.warning(`Only ${lotterySettings.ticketMaxNumbers} number can be selected`, {
            toastId: 'sameError',
          });
          return prevData;
        } else {
          return [...prevData, i];
        }
      }
    });
  };
  for (let i = lotterySettings.ticketStart; i <= lotterySettings.ticketEnd; i++) {
    const selected = props.numbers.includes(i);
    ticketNumbers.push(
      <TicketNumber
        key={i}
        extraClass="cursor-pointer p-[10px]"
        number={i}
        selected={selected}
        action={() => selectAction(selected, i)}
      />,
    );
  }

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(45px,1fr))] gap-[10px]">
      {ticketNumbers}
    </div>
  );
}

export default PlayerTicketBlock;
