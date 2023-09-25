import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { useAppContext } from '../core/Context';
import OperatorDashboardTitle from './OperatorDashboardTitle';
import OperatorTicketGeneratorPopUp from './OperatorTicketGeneratorPopUp';

function OperatorDashboardControllBlock() {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [ticketGeneratorPopup, setTicketGeneratorPopUp] = useState(false);

  const links = [
    {
      text: 'Reset game',
      action: () => lotteryDispatch({ type: tLotteryActionTypes.lotteryResetGame }),
    },
    {
      text: 'Start a new round',
      action: () => lotteryDispatch({ type: tLotteryActionTypes.lotterySetNewRound }),
    },
  ];

  if (!lotteryState.ticketList.played) {
    links.push(
      {
        text: 'Start number drawing',
        action: () => {
          // TODO drawing action
          lotteryDispatch({
            type: tLotteryActionTypes.lotterySetList,
            payload: {
              playerId: '',
              order: lotteryState.ticketList.order,
              page: lotteryState.ticketList.page,
            },
          });
        },
      },
      {
        text: 'Generate new auto tickets',
        action: () => setTicketGeneratorPopUp(true),
      },
    );
  }

  return (
    <div className="operator-dashboard-block">
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
