import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotteryDrawNumbers } from '../../logics/lottery/lotteryMiddlewares';
import { useAppContext } from '../core/Context';
import OperatorTicketGeneratorPopUp from './OperatorTicketGeneratorPopUp';
import DashboardBlock from '../general/DashboardBlock';

function OperatorDashboardControlBlock() {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [ticketGeneratorPopup, setTicketGeneratorPopUp] = useState(false);

  const links = [
    {
      text: 'Reset game',
      action: () => lotteryDispatch({ type: tLotteryActionTypes.lotteryResetGame }),
    },
  ];
  if (lotteryState.ticketList.played) {
    links.push({
      text: 'Start a new round',
      action: () => lotteryDispatch({ type: tLotteryActionTypes.lotterySetNewRound }),
    });
  } else {
    links.push(
      {
        text: 'Start number drawing',
        action: () => {
          // drawing number and return operator's data
          const operator = lotteryDrawNumbers();
          // if there were tickets, it stores data to operator's global state
          if (operator) {
            lotteryDispatch({
              type: tLotteryActionTypes.lotterySetOperator,
              payload: operator,
            });
          }
        },
      },
      {
        text: 'Generate new auto tickets',
        action: () => setTicketGeneratorPopUp(true),
      },
    );
  }

  const dataBlocks = [
    {
      title: 'Lottery game control',
      content: (
        <>
          {links.map((link, index) => (
            <div key={index} className="py-[5px]">
              <a className="link" onClick={link.action}>
                {link.text}
              </a>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      {ticketGeneratorPopup && (
        <OperatorTicketGeneratorPopUp setTicketGeneratorPopUp={setTicketGeneratorPopUp} />
      )}
      <DashboardBlock dataBlocks={dataBlocks} />
    </>
  );
}

export default OperatorDashboardControlBlock;
