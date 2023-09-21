import { useState } from 'react';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FormButtonBlock from '../form/FormButtonBlock';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';

type tProps = {
  setTicketPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayerAddTicketPopUp(props: tProps) {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [formData, setFormData] = useState([]);

  const submit = () => {
    props.setTicketPopUp(false);
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
      <span className="text-[#505050]">
        {`Your currently available budget:
        ${lotteryState.player.budget[lotterySettings.defaultCurrency]} ${
          lotterySettings.defaultCurrency
        }`}
      </span>
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default PlayerAddTicketPopUp;
