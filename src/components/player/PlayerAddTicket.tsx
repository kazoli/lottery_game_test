import { useState } from 'react';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import PlayerAddTicketPopUp from './PlayerAddTicketPopUp';

function PlayerAddTicket() {
  const { lotteryState } = useAppContext();
  const [ticketPopUp, setTicketPopUp] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      {lotteryState.player.budget[lotterySettings.defaultCurrency] < lotterySettings.gamePrice ? (
        `You do not have enough budget to play because you have ${
          lotteryState.player.budget[lotterySettings.defaultCurrency]
        } ${lotterySettings.defaultCurrency} and one game costs ${lotterySettings.gamePrice}  ${
          lotterySettings.defaultCurrency
        }.`
      ) : (
        <>
          {ticketPopUp && <PlayerAddTicketPopUp setTicketPopUp={setTicketPopUp} />}
          <button className="list-control-element" onClick={() => setTicketPopUp(true)}>
            Add a new lottery ticket
          </button>
        </>
      )}
    </div>
  );
}

export default PlayerAddTicket;
