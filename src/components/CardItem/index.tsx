interface IProps {
  value: string;
  title: string;
  progress?: number;
  progressColor?: string;
  chidrenIcon?: any;
  price?: string;
}

const CardItem = ({ title, value, chidrenIcon }: IProps) => {

  return (
    <div className="border flex flex-col shadow gap-3 justify-between border-stroke bg-white p-4 rounded-xl cursor-pointer hover:opacity-75">
       <p className="text-sm font-normal text-grayLight capitalize">{title}</p>
      <div className="flex w-full items-center justify-between rounded-xl">
        <div className="flex flex-col">
          <span className="text-[22px] font-Inter font-bold text-blackLight">{value}</span>
        </div>
        {chidrenIcon}
      </div>
    </div>
  );
};

export default CardItem;
