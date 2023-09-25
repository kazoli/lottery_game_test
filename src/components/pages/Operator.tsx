import { useEffect } from 'react';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import { tLotteryActionTypes } from '../../logics/lottery/lotteryTypes';
import ContentLoading from '../general/ContentLoading';
import ListBody from '../list/ListBody';
import PageHeadLine from '../general/PageHeadLine';
import OperatorListHeader from '../operator/OperatorListHeader';
import ListFooter from '../list/ListFooter';
import OperatorDashboard from '../operator/OperatorDashboard';

function Operator() {
  const { lotteryState, lotteryDispatch } = useAppContext();

  useEffect(() => {
    document.title = 'Lottery Game - Operator';
    // initialize operator data
    lotteryDispatch({
      type: tLotteryActionTypes.lotterySetOperator,
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
            subTitle="You can controll the lottery game by the dashboard"
          />
          <OperatorDashboard />
          <OperatorListHeader />
          <ListBody />
          <ListFooter />
        </>
      ) : (
        <ContentLoading />
      )}
    </DefaultLayout>
  );
}

export default Operator;
