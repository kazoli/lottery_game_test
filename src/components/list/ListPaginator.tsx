import { tButtonBlock } from '../../logics/general/types';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { useAppContext } from '../core/Context';
import { LuChevronFirst, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import ButtonBlock from '../general/ButtonBlock';

function ListPaginator() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  const page = lotteryState.ticketList.page === '1' ? 1 : parseInt(lotteryState.ticketList.page);
  const buttons: tButtonBlock = [
    {
      disabled: page === 1,
      content: (
        <span className="flex items-center pr-[5px] uppercase">
          <LuChevronLeft className="text-[1.2rem]" />
          Prev
        </span>
      ),
      title: 'Previous page',
      action: () =>
        lotteryDispatch({
          type: tLotteryActionTypes.lotterySetListPage,
          payload: `${page === 2 ? '' : page - 1}`,
        }),
    },
    {
      disabled: true,
      content: <span className="px-[5px]">{lotteryState.ticketList.page}</span>,
      title: `Page ${page}`,
      action: () => {},
    },
    {
      disabled: !lotteryState.ticketList.isNextPage,
      content: (
        <span className="flex items-center pl-[5px] uppercase">
          Next
          <LuChevronRight className="text-[1.2rem]" />
        </span>
      ),
      title: 'Next page',
      action: () =>
        lotteryDispatch({
          type: tLotteryActionTypes.lotterySetListPage,
          payload: `${page + 1}`,
        }),
    },
  ];

  if (page > 1) {
    buttons.unshift({
      content: (
        <span className="flex items-center pr-[5px] uppercase">
          <LuChevronFirst className="text-[1.2rem]" />
          First
        </span>
      ),
      title: 'First page',
      action: () => lotteryDispatch({ type: tLotteryActionTypes.lotterySetListPage, payload: '1' }),
    });
  }

  return (
    <ButtonBlock
      buttons={buttons}
      buttonStyle="list-element-controller p-[5px]"
      buttonStyleDisabled="list-element-disabled"
    />
  );
}

export default ListPaginator;
