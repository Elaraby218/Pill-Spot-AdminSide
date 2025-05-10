import { Flex, Splitter, Typography } from "antd";
import CompCard from "./compCard";
import FeedHeader from "./header/header";

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: "100%" }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{ whiteSpace: "nowrap", color: "#ffffff" }}
    >
      {props.text}
    </Typography.Title>
  </Flex>
);

const FeedbackPage = () => {
  return (
    <div className="flex flex-col items-center w-full gap-10">
      <FeedHeader />
      <div className="flex w-full">
        <div className="flex-1 flex-col">
          <div className="flex gap-10 items-center justify-center">
            <span>Complains</span>
            <span>Feedbacks</span>
          </div>
          <div className="h-[75vh] overflow-auto">
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
            <CompCard />
          </div>
        </div>
        <div className="flex-[3]">
          <Splitter
            style={{
              height: "77vh",
              backgroundColor: "#1f2937",
              color: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
            }}
          >
            <Splitter.Panel defaultSize="40%" min="20%" max="70%">
              <Desc text="First" />
            </Splitter.Panel>
            <Splitter.Panel>
              <Desc text="Second" />
            </Splitter.Panel>
          </Splitter>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
