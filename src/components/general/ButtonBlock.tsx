import { tButtonBlock } from '../../logics/general/types';

type tProps = {
  blockStyle?: string;
  buttonStyleDisabled?: string;
  buttonStyle: string;
  buttons: tButtonBlock;
};

function ButtonBlock(props: tProps) {
  return (
    <div className={`flex flex-wrap gap-[10px] ${props.blockStyle ?? ''}`}>
      {props.buttons.map((button, index) => (
        <button
          key={index}
          title={button.title}
          disabled={button.disabled}
          onClick={button.action}
          className={
            button.disabled && props.buttonStyleDisabled
              ? props.buttonStyleDisabled
              : props.buttonStyle
          }
        >
          {button.content}
        </button>
      ))}
    </div>
  );
}

export default ButtonBlock;
