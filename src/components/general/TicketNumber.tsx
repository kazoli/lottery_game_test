type tProps = {
  number: number;
  selected: boolean;
  extraClass: string;
  action?: () => void;
};

const colors = {
  base: 'shadow-[inset_0_0_5px_0_#d0d0d0,0_0_0_1px_#d0d0d0]',
  selected: 'text-[#705300] shadow-[inset_0_0_5px_0_#ebad00,0_0_0_1px_#ebad00]',
};

function TicketNumber(props: tProps) {
  return (
    <span
      key={props.number}
      className={`flex items-center justify-center rounded-[3px] bg-[#fff] ${props.extraClass} ${
        props.selected ? colors.selected : colors.base
      }`}
      onClick={props.action}
    >
      {props.number}
    </span>
  );
}

export default TicketNumber;
