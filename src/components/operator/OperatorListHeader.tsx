import { lotteryOperatorListOrder } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import ListTotalResults from '../list/ListTotalResults';
import ListOrder from '../list/ListOrder';
import ListPaginator from '../list/ListPaginator';

function OperatorListHeader() {
  const { lotteryState } = useAppContext();

  return (
    <section className="list-control-header">
      <div className="flex flex-wrap gap-[10px]">
        <ListTotalResults />
        {lotteryState.ticketList.played && <ListOrder orders={lotteryOperatorListOrder} />}
      </div>
      <ListPaginator />
    </section>
  );
}

export default OperatorListHeader;
