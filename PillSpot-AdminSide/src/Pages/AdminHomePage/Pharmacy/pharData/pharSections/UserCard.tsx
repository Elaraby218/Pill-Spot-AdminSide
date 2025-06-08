import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { Employee } from "../../types";

interface UserCardProps {
  employee: Employee;
  onDelete: () => void;
  onEdit: () => void;
}

const UserCard = ({ employee, onDelete, onEdit }: UserCardProps) => {
  const base = "https://localhost:7298/" ;
  const setStyle =
    "bg-base-100 w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 duration-200 cursor-pointer";
  
  return (
    <div className="flex flex-col w-full sm:w-[19rem] mt-5 bg-[#2C3745] min-h-[40vh] rounded-2xl py-5 px-5 dark:bg-gray-300 dark:text-gray-600">
      {/* image and name  */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-3 flex-[6] dark:text-gray-600">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={base+employee.imageUrl || "https://via.placeholder.com/150"}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[#c3d4eb] text-lg sm:text-xl text-center dark:text-gray-600">
            {`${employee.firstName} ${employee.lastName}`}
          </span>
        </div>

        <div className="flex items-center justify-around flex-1 text-xl sm:text-2xl gap-5">
          <div className={setStyle} onClick={onDelete}>
            <MdDelete />
          </div>
          <div className={setStyle} onClick={onEdit}>
            <FaUserEdit />
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="divider"></div>

      {/* info */}
      <div className="flex flex-col items-start gap-4 text-sm sm:text-base text-white dark:text-gray-600">
        <span className="flex items-center gap-3">
          <FaUser />
          {employee.role}
        </span>
        <span className="flex items-center gap-3">
          <FaPhone />
          {employee.phoneNumber}
        </span>
        <span className="flex items-center gap-3">
          <IoMailSharp />
          {employee.email}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
