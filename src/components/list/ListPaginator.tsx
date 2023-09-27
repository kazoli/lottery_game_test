import { tButtonBlock } from '../../logics/general/types';
import { tLotteryActionTypes, tLotteryState } from '../../logics/lottery/lotteryTypes';
import { scrollToElement } from '../../logics/general/middlewares';
import { useAppContext } from '../core/Context';
import { LuChevronFirst, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import ButtonBlock from '../general/ButtonBlock';

function ListPaginator() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  if (lotteryState.ticketList.page === '1' && !lotteryState.ticketList.isNextPage) {
    return <span className="list-element-disabled px-[10px] uppercase">1 page</span>;
  }

  const changePage = (page: tLotteryState['ticketList']['page']) => {
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
            order: lotteryState.ticketList.order,
            page: page,
          },
        }),
      1,
    );
    // scroll up to the list top
    setTimeout(
      () => scrollToElement('smooth', document.querySelector('.list-control-header') ?? window),
      100,
    );
  };

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
      action: () => changePage(`${page === 2 ? '1' : page - 1}`),
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
      action: () => changePage(`${page + 1}`),
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
      action: () => changePage('1'),
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
