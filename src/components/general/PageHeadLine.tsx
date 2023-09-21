type tProps = {
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
};

function PageHeadLine(props: tProps) {
  return (
    <section className="mb-[20px] sm:mb-[50px]">
      <h1 className="text-[1.5rem] sm:text-[2rem]">{props.title}</h1>
      {props.subTitle && <h3 className="text-[#777]">{props.subTitle}</h3>}
    </section>
  );
}

export default PageHeadLine;
