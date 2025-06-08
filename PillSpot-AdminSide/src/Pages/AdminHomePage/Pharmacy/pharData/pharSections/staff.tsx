import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useTransaction } from "../../../../../hooks/useTransaction";
import axiosInstance from "../../../../../axiosInstance";
import { Employee } from "../../types";

interface Iprops {
  pharmacyId: string | undefined;
}

const PharStaff = ({ pharmacyId }: Iprops) => {
  const { execute, loading, error, data: employees } = useTransaction<Employee[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

console.log(pharmacyId)

  useEffect(() => {
    if (pharmacyId) {
      fetchEmployees();
    }
  }, [pharmacyId]);

  const fetchEmployees = async () => {
    try {
      await execute(
        axiosInstance.get<Employee[]>(`/api/pharmacy-employees/${pharmacyId}/employees`)
          .then(res => res.data)
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const filteredEmployees = employees?.filter(employee => {
    const matchesSearch = `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-around items-center w-full mt-5 dark:text-black">
        <div className="flex items-center gap-5">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Type here"
            className="bg-[#2C3745] p-2 rounded-2xl dark:bg-gray-300 dark:placeholder:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="dropdown dropdown-hover">
          <div className="flex items-center gap-5">
            <label htmlFor="job">Job</label>
            <div
              tabIndex={0}
              role="button"
              id="job"
              className="bg-[#2C3745] p-2 rounded-2xl w-50 text-center dark:bg-gray-300"
            >
              {selectedRole || "All Roles"}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => setSelectedRole("")}>All Roles</a>
            </li>
            <li>
              <a onClick={() => setSelectedRole("Manager")}>Manager</a>
            </li>
            <li>
              <a onClick={() => setSelectedRole("Pharmacist")}>Pharmacist</a>
            </li>
            <li>
              <a onClick={() => setSelectedRole("Assistant")}>Assistant</a>
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-4">{error}</div>
      ) : (
        <div className="flex gap-5 flex-wrap items-center justify-center">
          {filteredEmployees?.map((employee) => (
            <UserCard
              key={employee.id}
              employee={employee}
              onDelete={() => {/* Handle delete */}}
              onEdit={() => {/* Handle edit */}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PharStaff;
