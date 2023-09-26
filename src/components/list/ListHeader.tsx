import { tDropDownOption } from '../../logics/general/types';
import { useAppContext } from '../core/Context';
import ListTotalResults from './ListTotalResults';
import ListOrder from './ListOrder';

type tProps = {
  order: tDropDownOption[];
};

function ListHeader(props: tProps) {
  const { lotteryState } = useAppContext();

  return (
    <section className="list-control-header">
      <ListTotalResults />
      {lotteryState.ticketList.played && <ListOrder orders={props.order} />}
    </section>
  );
}

export default ListHeader;
