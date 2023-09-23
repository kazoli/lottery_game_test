type tProps = {
  label: string;
  children: string | JSX.Element;
};

function ListBodyElementBlock(props: tProps) {
  return (
    <div className="first-of-type:mt-[0] mt-[10px]">
      <label className="block font-[500]">{props.label}</label>
      {props.children}
    </div>
  );
}

export default ListBodyElementBlock;
