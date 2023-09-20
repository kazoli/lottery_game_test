import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';

type tProps = {
  setNamePopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

function PlayerHeadLineSubTitle(props: tProps) {
  const { lotteryState } = useAppContext();
  return (
    <>
      Your playing budget is {lotteryState.player.budget[lotterySettings.defaultCurrency]}{' '}
      {lotterySettings.defaultCurrency}. You can change your name{' '}
      <span className="link" onClick={() => props.setNamePopUp(true)}>
        here
      </span>
      .
    </>
  );
}

export default PlayerHeadLineSubTitle;
