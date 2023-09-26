import { useState } from 'react';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import PlayerAddTicketPopUp from './PlayerAddTicketPopUp';

function PlayerDashboard() {
  const { lotteryState } = useAppContext();
  const [ticketPopUp, setTicketPopUp] = useState(false);
  const links = [
    {
      content: 'Add a new lottery ticket',
      action: () => setTicketPopUp(true),
    },
  ];

  return (
    <div className="dashboard-block mb-[30px]">
      {lotteryState.player.budget < lotterySettings.gamePrice ? (
        `You do not have enough budget to play because you have 
        ${lotteryState.player.budget} 
        ${lotterySettings.defaultCurrency} 
        and one game costs 
        ${lotterySettings.gamePrice} 
        ${lotterySettings.defaultCurrency}.`
      ) : (
        <>
          {ticketPopUp && <PlayerAddTicketPopUp setTicketPopUp={setTicketPopUp} />}
          {links.map((link, index) => (
            <div key={index} className="py-[5px]">
              <a className="link" onClick={link.action}>
                {link.content}
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PlayerDashboard;
