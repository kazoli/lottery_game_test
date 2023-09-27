import { tButtonBlock } from '../../logics/general/types';
import { tLotteryActionTypes, tLotteryState } from '../../logics/lottery/lotteryTypes';
import { useAppContext } from '../core/Context';
import { TfiLayoutGrid2, TfiViewList } from 'react-icons/tfi';
import ButtonBlock from '../general/ButtonBlock';

function ListView() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  const changeListView = (listView: tLotteryState['ticketList']['listView']) => {
    lotteryDispatch({
      type: tLotteryActionTypes.lotterySetListView,
      payload: listView,
    });
  };

  const buttons: tButtonBlock = [
    {
      disabled: lotteryState.ticketList.listView === 'grid',
      content: <TfiLayoutGrid2 />,
      title: 'Grid view',
      action: () => changeListView('grid'),
    },
    {
      disabled: lotteryState.ticketList.listView === 'list',
      content: <TfiViewList />,
      title: 'List view',
      action: () => changeListView('list'),
    },
  ];

  return (
    <ButtonBlock
      buttons={buttons}
      buttonStyle="list-element-controller"
      buttonStyleDisabled="list-element-disabled p-[5px_10px]"
    />
  );
}

export default ListView;
