import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { lotteryValidateMaxTicketNumbers } from '../../logics/lottery/lotteryValidation';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import ButtonBlock from '../general/ButtonBlock';
import FormInputBlock from '../form/FormInputBlock';
import { lotteryGenerateAutoTickets } from '../../logics/lottery/lotteryMiddlewares';

type tProps = {
  setTicketGeneratorPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function OperatorTicketGeneratorPopUp(props: tProps) {
  const { lotteryDispatch } = useAppContext();
  const [ticketNumber, setTicketNumber] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const errorMessage = lotteryValidateMaxTicketNumbers(ticketNumber, label);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      // show loading text
      lotteryDispatch({
        type: tLotteryActionTypes.lotterySetStatus,
        payload: 'loading',
      });
      // waiting to show the loading first
      setTimeout(() => {
        // generating new tickets
        const result = lotteryGenerateAutoTickets(ticketNumber);
        // if tickets could be generated, it runs the payment
        if (result) {
          // send ticket numbers to calculations
          lotteryDispatch({
            type: tLotteryActionTypes.lotterySetAutoTickets,
            payload: ticketNumber,
          });
        } else {
          // hide loading text
          lotteryDispatch({
            type: tLotteryActionTypes.lotterySetStatus,
            payload: 'idle',
          });
        }
        // close popup
        props.setTicketGeneratorPopUp(false);
      }, 10);
    }
  };

  const label = 'Ticket number';
  const buttons = [
    {
      content: 'Generate new auto tickets',
      action: submit,
    },
    {
      content: 'Cancel',
      action: () => props.setTicketGeneratorPopUp(false),
    },
  ];

  return (
    <PopUp>
      <FormInputBlock
        type="text"
        labelStyle="mb-[2px]"
        label={label}
        id="ticket-number"
        autocomplete="off"
        placeholder={`${lotterySettings.validation.maxTicketNumber} tickets can be generated at once`}
        value={ticketNumber}
        action={setTicketNumber}
        error={error}
      />
      <ButtonBlock buttons={buttons} buttonStyle="form-button" blockStyle="mt-[20px]" />
    </PopUp>
  );
}

export default OperatorTicketGeneratorPopUp;
