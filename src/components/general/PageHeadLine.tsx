type tProps = {
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
};

function PageHeadLine(props: tProps) {
  return (
    <>
      <h1 className="text-[2rem]">{props.title}</h1>
      {props.subTitle && <h3 className="text-[#777]">{props.subTitle}</h3>}
    </>
  );
}

export default PageHeadLine;
