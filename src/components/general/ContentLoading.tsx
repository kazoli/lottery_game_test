function ContentLoading() {
  return (
    <div className="flex items-center">
      <span className="animate-spin h-[1rem] w-[1rem] mr-[5px] border-[5px] border-[#000_transparent_#999_transparent] rounded-full" />
      <span className="animate-pulse text-[#000] text-[1.25rem]">Please wait, loading...</span>
    </div>
  );
}

export default ContentLoading;
