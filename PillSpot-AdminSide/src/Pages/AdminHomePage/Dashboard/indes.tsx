// import PharmacyCard from "../../../components/PharmacyCard/PharmacyCard";
import TODO from "../../../components/TODO";
import InfoCard from "./InfoCard";
import PreviewCard from "./PreviewCard";

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
          <PreviewCard w={30} title="Last Joined Pharmcies">
            {/* <PharmacyCard />
            <PharmacyCard />
            <PharmacyCard />
            <PharmacyCard />
            <PharmacyCard />
            <PharmacyCard /> */}
            hello
          </PreviewCard>

          <PreviewCard w={40} title="TODO Tasks">
            <TODO />
          </PreviewCard>

          <div className="flex flex-col justify-between h-[52vh]">
          <div
            className="bg-base-100 rounded-3xl h-130 w-64 hidden sm:flex flex-col items-center p-4 hover:bg-base-300 duration-300 relative overflow-auto"
            style={{ width: `${17}vw`, height: "15vh" }}
          >
            <div className="text-7xl absolute top-8 left-15">260</div>
            <div className="absolute text-2xl text-gray-400 top-25 right-5 w-fit px-4 gap-2 flex flex-col">Online User</div>
          </div>
          <div
            className="bg-base-100 rounded-3xl h-130 w-64 hidden sm:flex flex-col items-center p-4 hover:bg-base-300 duration-300 relative overflow-auto"
            style={{ width: `${17}vw`, height: "15vh" }}
          >
            <div className="text-7xl absolute top-8 right-15">70</div>
            <div className="absolute text-2xl text-gray-400 top-25 left-5 w-fit px-4 gap-2 flex flex-col">Online Pharmacy</div>
          </div>
          <div
            className="bg-base-100 rounded-3xl h-130 w-64 hidden sm:flex flex-col items-center p-4 hover:bg-base-300 duration-300 relative overflow-auto"
            style={{ width: `${17}vw`, height: "15vh" }}
          >
            <div className="text-7xl absolute top-8 left-21">520</div>
            <div className="absolute text-2xl text-gray-400 top-27 right-5 w-fit px-4 gap-2 flex flex-col">Delivered Orders</div>
          </div>
          

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
