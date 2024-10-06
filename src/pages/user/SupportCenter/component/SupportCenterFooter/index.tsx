interface IProps {}
const SupportCenterFooter = ({}: IProps) => {
  return (
    <footer className="dashboard-header no-input z-999 drop-shadow-1 sticky top-0 z-10 flex h-24 w-full border-t border-t-[#c6c6c6] bg-white">
      <div className="shadow-2 bg-clarifi flex flex-grow items-center justify-between overflow-hidden px-4 py-4 md:px-6 2xl:px-11">
        <div className="ml-20 flex items-center gap-1">
          <p className="text-[20px] font-bold text-orange-500">Clarifi </p>
          <p className="text-[20px] font-bold">Support</p>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </footer>
  );
};

export default SupportCenterFooter;
