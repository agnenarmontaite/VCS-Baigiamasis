import { GiCircularSaw, GiDrill } from 'react-icons/gi';
import { MdMoreHoriz, MdPlumbing } from 'react-icons/md';

const TopCategories = () => {
  return (
    <div className="top-categories flex flex-col items-center">
      <h2>Browse From Top Categories</h2>
      <div className="top-categories-list flex justify-between">
        <a href="#drilling-equipment">
          <GiDrill className="category-icon drill-icon" />
          Drilling equipment
        </a>
        <a href="#cutting-equipment">
          {' '}
          <GiCircularSaw className="category-icon cutting-icon" /> Cutting equipment
        </a>
        <a href="#plumbing-equipment">
          {' '}
          <MdPlumbing className="category-icon plumbing-icon" /> Plumbing equipment
        </a>
        <a href="#more">
          {' '}
          <MdMoreHoriz className="category-icon more-icon" /> More
        </a>
      </div>
    </div>
  );
};

export default TopCategories;
