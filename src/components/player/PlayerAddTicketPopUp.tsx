import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { lotteryStorePlayerTicket } from '../../logics/lottery/lotteryMiddlewares';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FromCustomBlock from '../form/FromCustomBlock';
import PlayerTicketBlock from './PlayerTicketBlock';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = {
  setTicketPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayerAddTicketPopUp(props: tProps) {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState('');

  const submit = () => {
    if (numbers.length === lotterySettings.ticketMaxSelectable) {
      lotteryDispatch({
        type: tLotteryActionTypes.lotterySetPlayerTicket,
        payload: lotteryStorePlayerTicket(lotteryState.player.id, numbers),
      });
      props.setTicketPopUp(false);
    } else {
      setError(`Please select ${lotterySettings.ticketMaxSelectable} numbers first`);
    }
  };

  const buttons = [
    {
      text: 'Submit lottery ticket',
      action: submit,
    },
    {
      text: 'Cancel',
      action: () => props.setTicketPopUp(false),
    },
  ];

  return (
    <PopUp>
      <FromCustomBlock
        label="Your current budget"
        content={
          lotteryState.player.budget[lotterySettings.defaultCurrency] +
          ' ' +
          lotterySettings.defaultCurrency
        }
      />
      <FromCustomBlock
        label="Price of a game"
        content={lotterySettings.gamePrice + ' ' + lotterySettings.defaultCurrency}
      />
      <FromCustomBlock
        label="Your remaining budget"
        content={
          lotteryState.player.budget[lotterySettings.defaultCurrency] -
          lotterySettings.gamePrice +
          ' ' +
          lotterySettings.defaultCurrency
        }
      />
      <FromCustomBlock
        label={`Select ${lotterySettings.ticketMaxSelectable} numbers`}
        content={<PlayerTicketBlock numbers={numbers} setNumbers={setNumbers} />}
        error={error}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default PlayerAddTicketPopUp;
