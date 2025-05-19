import OperatorDashboardControlBlock from './OperatorDashboardControlBlock';
import OperatorDashboardInfoBlock from './OperatorDashboardInfoBlock';

function OperatorDashboard() {
  return (
    <section className="flex flex-wrap gap-[10px] mb-[20px] sm:mb-[30px]">
      <OperatorDashboardControlBlock />
      <OperatorDashboardInfoBlock />
    </section>
  );
}

export default OperatorDashboard;
