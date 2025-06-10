import { useState } from "react";
import Category from "./category/category";
import SubCategoy from "./category/subCategory";
import AddMedcine from "./ProductPage";
import CosmeticPage from "./CosmeticPage";
import { ICategory } from "../../Featurs/category/categorySlice";

const AddProduct = () => {
  const [activeButton, setActiveButton] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  console.log(selectedCategory);

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const pages = [
    <div className="flex w-full gap-5">
      <Category onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <SubCategoy selectedCategory={selectedCategory} />
    </div>,
    <AddMedcine/>,
    <CosmeticPage/>
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      {/* header */}
      <div id="header" className="flex items-center justify-center gap-5">
        <button
          onClick={() => handleClick("category")}
          className={`btn rounded-3xl ${
            activeButton === "category" ? "bg-gray-600 text-white" : ""
          }`}
        >
          Add Category
        </button>
        <button
          onClick={() => handleClick("medicine")}
          className={`btn rounded-3xl ${
            activeButton === "medicine" ? "bg-gray-600 text-white" : ""
          }`}
        >
          Add Medicine
        </button>
        <button
          onClick={() => handleClick("cosmetic")}
          className={`btn rounded-3xl ${
            activeButton === "cosmetic" ? "bg-gray-600 text-white" : ""
          }`}
        >
          Add Cosmetic
        </button>
      </div>

      <div>
        {activeButton === 'category' && pages[0]}
        {activeButton === 'medicine' && pages[1]}
        {activeButton === 'cosmetic' && pages[2]}
      </div>
    </div>
  );
};

export default AddProduct;
