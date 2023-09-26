import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { useAppContext } from '../core/Context';
import OperatorDashboardTitle from './OperatorDashboardTitle';
import OperatorTicketGeneratorPopUp from './OperatorTicketGeneratorPopUp';
import { lotteryDrawNumbers } from '../../logics/lottery/lotteryMiddlewares';

function OperatorDashboardControllBlock() {
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
          // drawing number
          lotteryDrawNumbers(lotteryState.operator);
        },
      },
      {
        text: 'Generate new auto tickets',
        action: () => setTicketGeneratorPopUp(true),
      },
    );
  }

  return (
    <div className="dashboard-block">
      {ticketGeneratorPopup && (
        <OperatorTicketGeneratorPopUp setTicketGeneratorPopUp={setTicketGeneratorPopUp} />
      )}
      <OperatorDashboardTitle title="Lottery game controll" />
      {links.map((link, index) => (
        <div key={index} className="py-[5px]">
          <a className="link" onClick={link.action}>
            {link.text}
          </a>
        </div>
      ))}
    </div>
  );
}

export default OperatorDashboardControllBlock;
