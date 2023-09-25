type tProps = {
  title: string | JSX.Element;
};

function OperatorDashboardTitle(props: tProps) {
  return <h6 className="font-[500] border-b border-[#d0d0d0] pb-[2px] mb-[5px]">{props.title}</h6>;
}

export default OperatorDashboardTitle;
