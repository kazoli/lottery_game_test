import ErrorMessage from '../general/ErrorMessage';
import FormLabel from './FormLabel';

type tProps = {
  blockStyle?: string;
  labelStyle?: string;
  errorStyle?: string;
  error?: string;
  label: string;
  content: string | JSX.Element;
};

function FromCustomBlock(props: tProps) {
  return (
    <div className={`flex flex-wrap first-of-type:mt-0 mt-[15px] ${props.blockStyle ?? ''}`}>
      <FormLabel id="" labelStyle={props.labelStyle} label={props.label} />
      {props.content}
      {props.error && (
        <ErrorMessage text={props.error} style={`w-full ${props.errorStyle ?? ''}`} />
      )}
    </div>
  );
}

export default FromCustomBlock;
