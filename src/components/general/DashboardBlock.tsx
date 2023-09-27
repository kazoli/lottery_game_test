type tProps = {
  blockStyle?: string;
  dataBlocks: {
    style?: string;
    title: string;
    content: JSX.Element;
  }[];
};

function DashboardBlock(props: tProps) {
  return (
    <div className={`dashboard-block ${props.blockStyle ?? ''}`}>
      {props.dataBlocks.map((data, index) => (
        <div key={index} className={data.style ?? ''}>
          <h6 className="font-[500] border-b border-[#d0d0d0] pb-[2px] mb-[5px]">{data.title}</h6>
          {data.content}
        </div>
      ))}
    </div>
  );
}

export default DashboardBlock;
