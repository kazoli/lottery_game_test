import { useAppContext } from '../core/Context';

function ListTotalResults() {
  const { lotteryState } = useAppContext();

  return <div className="list-element">{`${lotteryState.ticketList.totalResults} results`}</div>;
}

export default ListTotalResults;
