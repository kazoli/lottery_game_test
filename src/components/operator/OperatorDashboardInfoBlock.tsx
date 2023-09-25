import { useAppContext } from '../core/Context';
import OperatorDashboardTitle from './OperatorDashboardTitle';

function OperatorDashboardInfoBlock() {
  const { lotteryState } = useAppContext();

  const dataBlocks = [
    {
      title: 'Tickets without prize',
      content: `Players' number: ${lotteryState.operator.statementData.loosers}`,
    },
    {
      title: 'Tickets with 2 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match2.players}`}</div>
          <div>{`Payment per player: ${lotteryState.operator.statementData.match2.playerPayment}`}</div>
          <div>{`Payment total: ${lotteryState.operator.statementData.match2.totalPayment}`}</div>
        </>
      ),
    },
    {
      title: 'Tickets with 3 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match3.players}`}</div>
          <div>{`Payment per player: ${lotteryState.operator.statementData.match3.playerPayment}`}</div>
          <div>{`Payment total: ${lotteryState.operator.statementData.match3.totalPayment}`}</div>
        </>
      ),
    },
    {
      title: 'Tickets with 4 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match4.players}`}</div>
          <div>{`Payment per player: ${lotteryState.operator.statementData.match4.playerPayment}`}</div>
          <div>{`Payment total: ${lotteryState.operator.statementData.match4.totalPayment}`}</div>
        </>
      ),
    },
    {
      title: 'Tickets with 5 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match5.players}`}</div>
          <div>{`Payment per player: ${lotteryState.operator.statementData.match5.playerPayment}`}</div>
          <div>{`Payment total: ${lotteryState.operator.statementData.match5.totalPayment}`}</div>
        </>
      ),
    },
    {
      title: 'All tickets',
      content: (
        <>
          <div>{`Round closed: ${lotteryState.ticketList.played ? 'Yes' : 'No'}`}</div>
          <div>{`Number of tickets: ${lotteryState.ticketList.totalResults}`}</div>
          <div>{`Total income in this round: ${lotteryState.operator.statementData.totalIncome}`}</div>
          <div>{`Total payment in this round: ${lotteryState.operator.statementData.totalPayment}`}</div>
          <div>{`Total profit in this round: ${lotteryState.operator.statementData.totalProfit}`}</div>
        </>
      ),
    },
  ];

  return (
    <div className="operator-dashboard-block grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[20px] flex-[10000_10000_300px]">
      {dataBlocks.map((data, index) => (
        <div key={index}>
          <OperatorDashboardTitle title={data.title} />
          {data.content}
        </div>
      ))}
    </div>
  );
}

export default OperatorDashboardInfoBlock;
