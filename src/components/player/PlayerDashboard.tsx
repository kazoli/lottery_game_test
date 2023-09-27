import { useState } from 'react';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import PlayerAddTicketPopUp from './PlayerAddTicketPopUp';
import DashboardBlock from '../general/DashboardBlock';

function PlayerDashboard() {
  const { lotteryState } = useAppContext();
  const [ticketPopUp, setTicketPopUp] = useState(false);

  const dataBlocks = [
    {
      title: 'Current budget',
      content: <div>{`${lotteryState.player.budget}  ${lotterySettings.defaultCurrency}`}</div>,
    },
  ];

  if (lotteryState.ticketList.played) {
    dataBlocks.push({
      title: 'Your current prize in this round',
      content: <div>{`${lotteryState.player.totalPrize} ${lotterySettings.defaultCurrency}`}</div>,
    });
  } else if (lotteryState.player.budget < lotterySettings.gamePrice) {
    dataBlocks.push({
      title: 'Ticket operations',
      content: (
        <div>
          {`You do not have enough budget to buy a ticket because you have 
            ${lotteryState.player.budget} 
            ${lotterySettings.defaultCurrency} 
            and one game costs 
            ${lotterySettings.gamePrice} 
            ${lotterySettings.defaultCurrency}`}
        </div>
      ),
    });
  } else {
    dataBlocks.push({
      title: 'Ticket operations',
      content: (
        <a className="link" onClick={() => setTicketPopUp(true)}>
          {'Add a new lottery ticket'}
        </a>
      ),
    });
  }

  return (
    <section className="mb-[20px] sm:mb-[30px]">
      {ticketPopUp && <PlayerAddTicketPopUp setTicketPopUp={setTicketPopUp} />}
      <DashboardBlock dataBlocks={dataBlocks} blockStyle="flex flex-wrap gap-[20px]" />
    </section>
  );
}

export default PlayerDashboard;
