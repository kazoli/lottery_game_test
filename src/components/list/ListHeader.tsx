import { tDropDownOption } from '../../logics/general/types';
import { useAppContext } from '../core/Context';
import ListTotalResults from './ListTotalResults';
import ListOrder from './ListOrder';
import ListView from './ListView';

type tProps = {
  order: tDropDownOption[];
};

function ListHeader(props: tProps) {
  const { lotteryState } = useAppContext();

  return (
    <section className="list-control-header">
      <ListTotalResults />
      <div className="list-control-bar">
        {lotteryState.ticketList.played && <ListOrder orders={props.order} />}
        <ListView />
      </div>
    </section>
  );
}

export default ListHeader;
