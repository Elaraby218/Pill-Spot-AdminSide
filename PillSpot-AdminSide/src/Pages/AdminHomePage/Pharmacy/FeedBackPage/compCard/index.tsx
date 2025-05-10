import { useState } from "react";
import "./complaintscard.css";

const CompCard = () => {
    const [c,setC] = useState(false);
  return (
    <div className="flex items-center justify-center gap-2">
        {
        c && 
        <div className="w-2 h-full bg-black flex flex-col">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
        </div>
        }
      <div id="com_box" onClick={()=>{setC(!c)}}>
        <div id="com_card">
          <div id="card_head">
            <div id="img_box">
              <img src="/image.png" alt="profile_picture" />
            </div>
            <div id="card_info">
              <span className="name">Ahmed Mohammed</span>
              <span className="role">User</span>
            </div>
            <span className="date">13 may</span>
          </div>
          <p className="complaint">
            I placed an order for several products including vitamins,
            painkillers, and skincare items. When the package arrived, I noticed
            that two of the items were missing (Vitamin D and Panadol Extra),
            and instead I received a different ......
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompCard;
