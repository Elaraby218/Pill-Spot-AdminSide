import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../../App/Store";
import { getPharmacyEmployees } from "../../../../../Featurs/pharmacy/getPharEmps";


interface Iprops {
  pharmacyId: string | undefined;
}

const ROLES = ["All Roles", "Manager", "Pharmacist", "Assistant"] as const;

const PharStaff = ({ pharmacyId }: Iprops) => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, message } = useSelector((state: RootState) => state.pharmacyEmployeesSlice);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (pharmacyId) {
       dispatch(getPharmacyEmployees(pharmacyId));
    }
  }, [pharmacyId, dispatch]);

  const filteredEmployees = employees?.filter(employee => {
    const matchesSearch = `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (!pharmacyId) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Select a pharmacy to view staff</p>
      </div>
    );
  }

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
            {ROLES.map((role) => (
              <li key={role}>
                <a onClick={() => setSelectedRole(role === "All Roles" ? "" : role)}>
                  {role}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {status === "loading" ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : status === "error" ? (
        <div className="text-red-500 mt-4">{message}</div>
      ) : (
        <div className="flex gap-5 flex-wrap items-center justify-center">
          {filteredEmployees?.map((employee) => (
            <UserCard
              key={employee.id+pharmacyId}
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
