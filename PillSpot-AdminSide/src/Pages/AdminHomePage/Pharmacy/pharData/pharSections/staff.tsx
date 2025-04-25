import UserCard from "./UserCard";

const PharStaff = () => {
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
              Hover
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap items-center justify-center ">
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
      </div>
    </div>
  );
};

export default PharStaff;
