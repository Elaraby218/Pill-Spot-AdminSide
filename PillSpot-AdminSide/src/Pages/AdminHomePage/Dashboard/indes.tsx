import InfoCard from "./InfoCard";

const AdminDashBoard = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex gap-5 items-center justify-center w-full max-w-[89vw] overflow-auto ">
          <InfoCard
            title="Regsitred Pharmacies"
            number={240}
            description="All approved pharmacies with active accounts"
          />
          <InfoCard
            title="Pending Requests"
            number={40}
            description="All Requests should be reviewd"
          />
          <InfoCard
            title="Rejected Requests"
            number={80}
            description="Requests that did not satisfy the conditions"
          />
          <InfoCard
            title="Tickets and complains"
            number={10}
            description="Users tickets and complains or problems"
          />
          <InfoCard
            title="Regsitred Pharmacies"
            number={240}
            description="All approved pharmacies with active accounts"
          />
          <InfoCard
            title="Regsitred Pharmacies"
            number={240}
            description="All approved pharmacies with active accounts"
          />
        </div>

        <div className="flex gap-5 items-center justify-center w-full max-w-[89vw] overflow-auto ">
          <div className="bg-base-100 rounded-3xl h-130 w-64 sm:w-160 flex flex-col justify-around p-4 hover:bg-base-300 duration-300">

          </div>
          <div className="bg-base-100 rounded-3xl h-130 w-64 sm:w-140 flex flex-col justify-around p-4 hover:bg-base-300 duration-300">

          </div>
          <div className="bg-base-100 rounded-3xl h-130 w-64 sm:w-115 flex flex-col justify-around p-4 hover:bg-base-300 duration-300">

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
