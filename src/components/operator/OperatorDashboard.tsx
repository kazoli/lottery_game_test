import OperatorDashboardControllBlock from './OperatorDashboardControllBlock';
import OperatorDashboardInfoBlock from './OperatorDashboardInfoBlock';

function OperatorDashboard() {
  return (
    <section className="flex flex-wrap gap-[10px] mb-[20px] sm:mb-[30px]">
      <OperatorDashboardControllBlock />
      <OperatorDashboardInfoBlock />
    </section>
  );
}

export default OperatorDashboard;
