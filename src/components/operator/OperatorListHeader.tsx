import { lotteryOperatorListOrder } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import ListOrder from '../list/ListOrder';
import ListPaginator from '../list/ListPaginator';

function OperatorListHeader() {
  const { lotteryState } = useAppContext();

  return (
    <section className="flex flex-wrap mb-[10px]">
      {lotteryState.ticketList.played && <ListOrder orders={lotteryOperatorListOrder} />}
      <ListPaginator />
    </section>
  );
}

export default OperatorListHeader;
