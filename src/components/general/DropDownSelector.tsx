import { AiOutlineDown } from 'react-icons/ai';

type tProps = {
  selected: string | JSX.Element;
};

function DropDownSelector(props: tProps) {
  return (
    <div className="flex gap-[5px] items-center">
      {props.selected}
      <AiOutlineDown className="icon-button" />
    </div>
  );
}

export default DropDownSelector;
