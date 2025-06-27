
import { MdSell } from "react-icons/md";
import { motion } from "framer-motion";

const ButtonCasd = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col bg-base-100 w-sm h-50 items-center justify-center rounded-3xl hover:scale-102 duration-200 cursor-pointer"
    >
      <MdSell size={80} className="hover:scale-110 duration-150" />
      <div className="text-xl mt-5">
        Product Management
      </div>
    </motion.div>
  );
};

const AdminDashBoard = () => {
  
  const delaysRow1 = [0, 0.1, 0.2];
  const delaysRow2 = [0.3, 0.4, 0.5, 0.6];
  const delaysRow3 = [0.7, 0.8, 0.9];
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-7 my-[5%] w-full">
     
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          {delaysRow1.map((delay, i) => <ButtonCasd key={i} delay={delay} />)}
        </div>
       
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          {delaysRow2.map((delay, i) => <ButtonCasd key={i} delay={delay} />)}
        </div>
     
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          {delaysRow3.map((delay, i) => <ButtonCasd key={i} delay={delay} />)}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
