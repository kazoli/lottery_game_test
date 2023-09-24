import { useState } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { lotteryValidatePlayer } from '../../logics/lottery/lotteryMiddlewares';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FormInputBlock from '../form/FormInputBlock';
import ButtonBlock from '../general/ButtonBlock';

type tProps = {
  setNamePopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayerNamePopUp(props: tProps) {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const [formData, setFormData] = useState({
    name: lotteryState.player.name,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
  });

  const submit = () => {
    const errors = lotteryValidatePlayer(formData, labels);
    if (errors.name) {
      setFormErrors(errors);
    } else {
      lotteryDispatch({ type: tLotteryActionTypes.lotterySetPlayerName, payload: formData.name });
      props.setNamePopUp(false);
    }
  };

  const labels = {
    name: 'Player name',
  };
  const buttons = [
    {
      content: 'Change name',
      action: submit,
    },
    {
      content: 'Cancel',
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
      <ButtonBlock buttons={buttons} buttonStyle="form-button" blockStyle="mt-[15px]" />
    </PopUp>
  );
}

export default PlayerNamePopUp;
