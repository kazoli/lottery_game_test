import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { lotteryStoreTicket } from '../../logics/lottery/lotteryMiddlewares';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FromCustomBlock from '../form/FromCustomBlock';
import PlayerTicketBlock from './PlayerTicketBlock';
import ButtonBlock from '../general/ButtonBlock';

type tProps = {
  setTicketPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayerAddTicketPopUp(props: tProps) {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState('');

  const submit = () => {
    if (numbers.length === lotterySettings.ticketMaxSelectable) {
      // creating and store new ticket
      lotteryStoreTicket(lotteryState.player.id, [numbers]);
      // set payment for ticket
      lotteryDispatch({ type: tLotteryActionTypes.lotterySetPlayerTicketPayment });
      // close popup
      props.setTicketPopUp(false);
    } else {
      setError(`Please select ${lotterySettings.ticketMaxSelectable} numbers first`);
    }
  };

  const buttons = [
    {
      content: 'Submit lottery ticket',
      action: submit,
    },
    {
      content: 'Cancel',
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
        labelStyle="mb-[2px]"
        label={`Select ${lotterySettings.ticketMaxSelectable} numbers`}
        content={<PlayerTicketBlock numbers={numbers} setNumbers={setNumbers} />}
        error={error}
      />
      <ButtonBlock buttons={buttons} buttonStyle="form-button" blockStyle="mt-[20px]" />
    </PopUp>
  );
}

export default PlayerAddTicketPopUp;
