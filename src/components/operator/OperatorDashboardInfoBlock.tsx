import { lotterySettings } from '../../logics/lottery/lotteryInitialStates';
import { useAppContext } from '../core/Context';
import DashboardBlock from '../general/DashboardBlock';

function OperatorDashboardInfoBlock() {
  const { lotteryState } = useAppContext();

  const dataBlocks = [
    {
      title: 'Tickets with 2 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match2.players}`}</div>
          <div>
            {`Payment per player: 
              ${lotteryState.operator.statementData.match2.playerPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
          <div>
            {`Payment total: 
              ${lotteryState.operator.statementData.match2.totalPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
        </>
      ),
    },
    {
      title: 'Tickets with 3 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match3.players}`}</div>
          <div>
            {`Payment per player: 
              ${lotteryState.operator.statementData.match3.playerPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
          <div>
            {`Payment total: 
              ${lotteryState.operator.statementData.match3.totalPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
        </>
      ),
    },
    {
      title: 'Tickets with 4 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match4.players}`}</div>
          <div>
            {`Payment per player: 
              ${lotteryState.operator.statementData.match4.playerPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
          <div>
            {`Payment total: 
              ${lotteryState.operator.statementData.match4.totalPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
        </>
      ),
    },
    {
      title: 'Tickets with 5 matches',
      content: (
        <>
          <div>{`Players' number: ${lotteryState.operator.statementData.match5.players}`}</div>
          <div>
            {`Payment per player: 
              ${lotteryState.operator.statementData.match5.playerPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
          <div>
            {`Payment total: 
              ${lotteryState.operator.statementData.match5.totalPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
        </>
      ),
    },
    {
      title: 'Operational information',
      content: (
        <>
          <div>{`Drawn numbers: ${
            lotteryState.operator.statementData.drawnNumbers.length
              ? lotteryState.operator.statementData.drawnNumbers.toString()
              : 'Not available yet'
          }`}</div>
          <div>{`Number of tickets: ${lotteryState.ticketList.totalResults}`}</div>
          <div>{`Tickets without prize: ${lotteryState.operator.statementData.noPrizeTickets}`}</div>
        </>
      ),
    },
    {
      title: 'Financial summary',
      content: (
        <>
          <div>{`Total budget: ${lotteryState.operator.budget} ${lotterySettings.defaultCurrency}`}</div>
          <div>
            {`Total income in this round: 
              ${lotteryState.operator.statementData.totalIncome} 
              ${lotterySettings.defaultCurrency}`}
          </div>
          <div>
            {`Total payment in this round: 
              ${lotteryState.operator.statementData.totalPayment} 
              ${lotterySettings.defaultCurrency}`}
          </div>
          <div>
            {`Total profit in this round: 
              ${lotteryState.operator.statementData.totalProfit} 
              ${lotterySettings.defaultCurrency}`}
          </div>
        </>
      ),
    },
  ];

  return (
    <DashboardBlock
      dataBlocks={dataBlocks}
      blockStyle="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[20px] flex-[10000_10000_300px]"
    />
  );
}

export default OperatorDashboardInfoBlock;
