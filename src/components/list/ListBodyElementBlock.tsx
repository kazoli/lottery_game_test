type tProps = {
  label: string;
  children: string | JSX.Element;
};

function ListBodyElementBlock(props: tProps) {
  return (
    <div className="min-w-[160px]">
      <label className="block font-[500]">{props.label}</label>
      {props.children}
    </div>
  );
}

export default ListBodyElementBlock;
