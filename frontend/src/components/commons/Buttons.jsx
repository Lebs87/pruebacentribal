import PropTypes from 'prop-types';

const Buttons = ({btnclass, btntext, onClick }) => {
  return (
    <button className={btnclass} onClick={onClick}>{btntext}</button>
  )
}

Buttons.propTypes = {
  btnclass: PropTypes.string.isRequired,
  btntext: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Buttons
