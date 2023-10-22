import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { useProductsContext, useProductsDispatch } from "../../context/ProductContext";
import MenuDropdown from "../Shared/MenuDropdown";

const SORT_BY = [
  {
    id: 1,
    name: "popularity",
    order: "asc",
    label: "Most Popular",
  },
  { id: 2, name: "createdAt", order: "asc", label: "Newest" },
  {
    id: 3,
    name: "price",
    order: "asc",
    label: "Price: Low to High",
  },
  {
    id: 4,
    name: "price",
    order: "desc",
    label: "Price: High to Low",
  },
];

const CATEGORIES = [
  {
    id: 1,
    name: null,
    label: "All",
  },
  {
    id: 2,
    name: "tee",
    label: "Tees",
  },
  { id: 3, name: "other", label: "Other" },
];

const COLORS = [
  {
    id: 1,
    name: null,
    label: "All",
  },
  {
    id: 2,
    name: "black",
    label: "Black",
  },
  { id: 3, name: "white", label: "White" },
];

function ProductActions() {
  const { sortBy, filterBy, orientation } = useProductsContext();
  const { setSortBy, setFilterBy, setOrientation } = useProductsDispatch();

  const handleSortBy = (item) => {
    const { name: key, order } = item;
    setSortBy({
      key,
      order,
    });
  };

  const handleFilterByCategory = (item) => {
    const { name: category } = item;
    setFilterBy({
      ...filterBy,
      category,
    });
  };

  const handleFilterByColor = (item) => {
    const { name: color } = item;
    setFilterBy({
      ...filterBy,
      color,
    });
  };

  const handleOrientation = () => {
    setOrientation(orientation === "vertical" ? "horizontal" : "vertical");
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <MenuDropdown
          label='Sort by'
          items={SORT_BY}
          position='right'
          onClick={handleSortBy}
          activeItem={sortBy.key}
        />
        <div className='flex items-center'>
          <MenuDropdown
            label='Categories'
            items={CATEGORIES}
            position='left'
            checkbox={true}
            onClick={handleFilterByCategory}
            activeItem={filterBy.category}
          />
          <MenuDropdown
            label='Color'
            items={COLORS}
            position='left'
            checkbox={true}
            onClick={handleFilterByColor}
            activeItem={filterBy.color}
          />
          <button
            type='button'
            className='hidden sm:block transition ml-5 p-2 text-gray-400 hover:text-indigo-600 sm:ml-7'
            onClick={handleOrientation}
          >
            <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductActions;
