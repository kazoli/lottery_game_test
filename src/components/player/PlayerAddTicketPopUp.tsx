import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { numberArrayReorder } from '../../logics/general/middlewares';
import { lotteryProcessTickets } from '../../logics/lottery/lotteryMiddlewares';
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
    if (numbers.length === lotterySettings.ticketMaxNumbers) {
      // ascend reordering and processing numbers into a ticket
      const result = lotteryProcessTickets(lotteryState.player.id, [numberArrayReorder(numbers)]);
      // if ticket could be generated, it runs the payment
      if (result) {
        lotteryDispatch({ type: tLotteryActionTypes.lotterySetPlayerTicketPayment });
      }
      // close popup
      props.setTicketPopUp(false);
    } else {
      setError(`Please select ${lotterySettings.ticketMaxNumbers} numbers first`);
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
        content={lotteryState.player.budget + ' ' + lotterySettings.defaultCurrency}
      />
      <FromCustomBlock
        label="Price of a lottey ticket"
        content={lotterySettings.gamePrice + ' ' + lotterySettings.defaultCurrency}
      />
      <FromCustomBlock
        label="Your remaining budget"
        content={
          lotteryState.player.budget -
          lotterySettings.gamePrice +
          ' ' +
          lotterySettings.defaultCurrency
        }
      />
      <FromCustomBlock
        labelStyle="mb-[2px]"
        label={`Select ${lotterySettings.ticketMaxNumbers} numbers`}
        content={<PlayerTicketBlock numbers={numbers} setNumbers={setNumbers} />}
        error={error}
      />
      <ButtonBlock buttons={buttons} buttonStyle="form-button" blockStyle="mt-[20px]" />
    </PopUp>
  );
}

export default PlayerAddTicketPopUp;
