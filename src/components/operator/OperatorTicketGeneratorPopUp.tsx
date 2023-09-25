import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import ButtonBlock from '../general/ButtonBlock';
import { lotteryValidateGeneratableTicketNumber } from '../../logics/lottery/lotteryMiddlewares';
import FormInputBlock from '../form/FormInputBlock';

type tProps = {
  setTicketGeneratorPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function OperatorTicketGeneratorPopUp(props: tProps) {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [ticketNumber, setTicketNumber] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const errorMessage = lotteryValidateGeneratableTicketNumber(ticketNumber, label);
    setError(errorMessage);
    if (!errorMessage) {
      // generating new tickets
      // TODO calculation missing
      // reload tickel list
      lotteryDispatch({
        type: tLotteryActionTypes.lotterySetList,
        payload: {
          playerId: '',
          order: lotteryState.ticketList.order,
          page: lotteryState.ticketList.page,
        },
      });
      // close popup
      props.setTicketGeneratorPopUp(false);
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
