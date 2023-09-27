import { useEffect } from 'react';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import { lotteryOperatorListOrder } from '../../logics/lottery/lotteryInitialStates';
import { lotteryInitializeOperator } from '../../logics/lottery/lotteryMiddlewares';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import ContentLoading from '../general/ContentLoading';
import PageHeadLine from '../general/PageHeadLine';
import OperatorDashboard from '../operator/OperatorDashboard';
import ListBody from '../list/ListBody';
import ListHeader from '../list/ListHeader';
import ListFooter from '../list/ListFooter';
import ListBodyEmpty from '../list/ListBodyEmpty';

function Operator() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  useEffect(() => {
    document.title = 'Lottery Game - Operator';
    // initialize operator data
    lotteryDispatch({
      type: tLotteryActionTypes.lotterySetOperator,
      payload: lotteryInitializeOperator(),
    });
    // clean up operator data
    return () => {
      lotteryDispatch({
        type: tLotteryActionTypes.lotteryUnsetOperator,
      });
    };
  }, [lotteryDispatch]);

  return (
    <DefaultLayout loading={lotteryState.status === 'loading'}>
      {lotteryState.operator.id ? (
        <>
          <PageHeadLine
            title="Operator"
            subTitle="You can controll the lottery game through the dashboard"
          />
          <OperatorDashboard />
          {lotteryState.ticketList.tickets.length ? (
            <>
              <ListHeader order={lotteryOperatorListOrder} />
              <ListBody />
              <ListFooter />
            </>
          ) : (
            <ListBodyEmpty />
          )}
        </>
      ) : (
        <ContentLoading />
      )}
    </DefaultLayout>
  );
}

export default Operator;
