import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      "Sorry the page you're looking for does not exist."
      <Link to="/rosters">
        "Click here to view Pokemon rosters"
      </Link>
    </>
  )
};

export default PageNotFound;