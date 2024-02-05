import PropTypes from 'prop-types';
import Navbar from "../commons/Navbar.jsx";

const PublicLayout = (props) => {
  return (
    <>
      <Navbar />
      <>{props.children}</>
    </>
  )
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicLayout