import { useState } from 'react'
import Buttons from '../commons/Buttons';
import PropTypes from 'prop-types';

const ItemCount = ({ quantity, onQuantityChange }) => {
  const [amount, setAmount] = useState(0);

  const add = () => {
    if (amount < quantity) {
      setAmount(amount + 1);
      onQuantityChange(amount + 1);
    }
  };

  const subtract = () => {
    if (amount > 0) {
      setAmount(amount - 1);
      onQuantityChange(amount - 1);
    }
  };

  const reset = () => {
    setAmount(0);
    onQuantityChange(0);
  };

	return (
		<>
			<section className='d-flex align-items-center justify-content-center'>
				<Buttons btnclass={"btn-simple btn-general"} btntext={"-"} disabled={amount === 0} onClick={subtract}></Buttons>
				<p className='mb-0'>{amount}</p>
				<Buttons btnclass={"btn-simple btn-general"} btntext={"+"} disabled={amount === quantity} onClick={add}></Buttons>
				<Buttons btnclass={"btn-orange btn-general d-none d-sm-table-cell"} btntext={"Reset"} onClick={reset} disabled={amount === 0}></Buttons>
			</section>
		</>
	)
}

ItemCount.propTypes = {
	quantity: PropTypes.number,
	onQuantityChange: PropTypes.func.isRequired,
};

export default ItemCount
