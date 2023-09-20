import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { lotteryValidatePlayer } from '../../logics/lottery/lotteryMiddlewares';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FormInputBlock from '../form/FormInputBlock';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = {
  setNamePopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayerNamePopUp(props: tProps) {
  const { lotteryDispatch } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
  });

  const submit = () => {
    const errors = lotteryValidatePlayer(formData, labels);
    if (errors.name) {
      setFormErrors(errors);
    } else {
      lotteryDispatch({ type: tLotteryActionTypes.lotterySetName, payload: formData.name });
      props.setNamePopUp(false);
    }
  };

  const labels = {
    name: 'Player name',
  };
  const buttons = [
    {
      text: 'Change name',
      action: submit,
    },
    {
      text: 'Cancel',
      action: () => props.setNamePopUp(false),
    },
  ];

  return (
    <PopUp>
      <FormInputBlock
        type="text"
        label={labels.name}
        id="title"
        placeholder={`${lotterySettings.validation.name.minLength} - ${lotterySettings.validation.name.maxLength} characters length`}
        value={formData.name}
        action={(value) => setFormData((prevState) => ({ ...prevState, name: value }))}
        error={formErrors.name}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default PlayerNamePopUp;
