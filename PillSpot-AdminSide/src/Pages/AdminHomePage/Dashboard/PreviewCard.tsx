import { ReactNode } from "react";


interface Iprops {
  w: number;
  title?: string;
  children : ReactNode ;
  h?:number;
}

const PreviewCard = ({ w, title , children, h=52}: Iprops) => {

    


  return (
    <div
      className="bg-base-100 rounded-3xl h-130 w-64 hidden sm:flex flex-col items-center p-4 hover:bg-base-300 duration-300 relative overflow-auto"
      style={{ width: `${w}vw`,height:`${h}vh`}}
    >
      {title && <span className="text-2xl absolute top-3 left-5">{title}</span>}
      <div className="absolute top-15 w-full px-4 gap-2 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default PreviewCard;
