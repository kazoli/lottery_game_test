import FormLabel from './FormLabel';
import ErrorMessage from '../general/ErrorMessage';

type tProps = {
  blockStyle?: string;
  labelStyle?: string;
  errorStyle?: string;
  error?: string;
  label: string;
  children: string | JSX.Element;
};

function FromCustomBlock(props: tProps) {
  return (
    <div className={`flex flex-wrap first-of-type:mt-0 mt-[15px] ${props.blockStyle ?? ''}`}>
      <FormLabel id="" labelStyle={props.labelStyle} label={props.label} />
      {props.children}
      {props.error && (
        <ErrorMessage text={props.error} style={`w-full ${props.errorStyle ?? ''}`} />
      )}
    </div>
  );
}

export default FromCustomBlock;
