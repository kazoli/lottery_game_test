import { tDropDownOption } from '../../logics/general/types';
import { dropDownCalculator } from '../../logics/general/middlewares';
import DropDownMenu from '../general/DropDownMenu';
import DropDownSelector from '../general/DropDownSelector';
import { useAppContext } from '../core/Context';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';

type tProps = {
  orders: tDropDownOption[];
};

function ListOrder(props: tProps) {
  const { lotteryState, lotteryDispatch } = useAppContext();
  const dropDown = dropDownCalculator(lotteryState.ticketList.order, props.orders);
  const selectAction = (value: tDropDownOption['key']) => {
    // show loading text
    lotteryDispatch({
      type: tLotteryActionTypes.lotterySetStatus,
      payload: 'loading',
    });
    // some delay to show loading text
    setTimeout(
      () =>
        lotteryDispatch({
          type: tLotteryActionTypes.lotterySetList,
          payload: {
            playerId: lotteryState.player.id,
            order: value.toString(),
            page: '1',
          },
        }),
      1,
    );
  };

  return (
    <DropDownMenu
      selected={<DropDownSelector selected={dropDown.selected} />}
      classContainer=""
      classTrigger="list-element"
      classList="left-[-1px] w-[max-content] p-[1px] bg-[#f0f0f0] mt-[5px] shadow-[0_0_5px_0_#d0d0d0]"
      classElement="list-element-controller transition-custom mt-[5px] first-of-type:mt-[0]"
      options={dropDown.options}
      action={selectAction}
    />
  );
}

export default ListOrder;
