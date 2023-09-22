import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { toast } from 'react-toastify';

type tProps = {
  numbers: number[];
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
};

const colors = {
  base: 'shadow-[inset_0_0_5px_0_#d0d0d0,0_0_0_1px_#d0d0d0]',
  selected: 'text-[#705300] shadow-[inset_0_0_5px_0_#ebad00,0_0_0_1px_#ebad00]',
};

function PlayerTicketBlock(props: tProps) {
  const elements = [];
  const selectAction = (selected: boolean, i: number) => {
    props.setNumbers((prevData) => {
      if (selected) {
        return prevData.filter((data) => data !== i);
      } else {
        if (prevData.length === lotterySettings.ticketMaxSelectable) {
          toast.warning(`Only ${lotterySettings.ticketMaxSelectable} number can be selected`, {
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
    elements.push(
      <span
        key={i}
        className={`relative flex items-center justify-center p-[10px] cursor-pointer rounded-[3px] ${
          selected ? colors.selected : colors.base
        }`}
        onClick={() => selectAction(selected, i)}
      >
        {i}
      </span>,
    );
  }

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(45px,1fr))] gap-[10px]">
      {elements}
    </div>
  );
}

export default PlayerTicketBlock;
