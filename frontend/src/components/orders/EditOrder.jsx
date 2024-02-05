import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from "../commons/Loading";
import Buttons from '../commons/Buttons';
import ItemCount from './ItemCount';

const EditOrder = () => {
	const navigate = useNavigate();
	const { idEditOrder } = useParams();
	const [articles, setArticles] = useState([]);
	const [order, setOrder] = useState({
		id: '',
		items: [],
		totalPriceWithoutTax: 0,
		totalPriceWithTax: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/orders/${idEditOrder}`);
				setOrder(response.data);
				const articleIds = response.data.items.map((item) => item.id);
				const articlePromises = articleIds.map(async (id) => {
					const articleResponse = await axios.get(`http://localhost:3001/articles/${id}`);
					return articleResponse.data;
				});
				const orderArticles = await Promise.all(articlePromises);
				setArticles(orderArticles);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [idEditOrder]);
	if (loading) {
		return <Loading />;
	}

	const getAvailableQuantity = (articleId) => {
		const articleInOrder = order.items.find((item) => item.id === articleId);
		const articleInStock = articles.find((article) => article.id === articleId);
		const quantityInOrder = articleInOrder ? articleInOrder.quantity : 0;
		const quantityInStock = articleInStock ? articleInStock.quantity : 0;
		const availableQuantity = Math.max(quantityInStock - quantityInOrder, 0);
		return availableQuantity;
	};

	const sendEditOrder = async (e) => {
		e.preventDefault();
		let totalPriceWithoutTax = 0;
		let totalPriceWithTax = 0;

		order.items.forEach((orderItem) => {
			totalPriceWithoutTax += orderItem.priceWithoutTax;
			totalPriceWithTax += orderItem.priceWithTax;
		});

		order.totalPriceWithoutTax = totalPriceWithoutTax;
		order.totalPriceWithTax = totalPriceWithTax;

		try {
			const response = await axios.put(`http://localhost:3001/orders/${idEditOrder}`, order);
			console.log('Orden editada con éxito', response.data);
			order.items.forEach(async (orderItem) => {
				try {
					const article = articles.find((article) => article.id === orderItem.articleId);
					if (article && orderItem.quantity > 0) {
						const newQuantity = article.quantity - orderItem.quantity;
						await axios.put(`http://localhost:3001/articles/${article.id}`, {
							...article,
							quantity: newQuantity,
						});
						console.log(`Cantidad de ${article.name} actualizada a ${newQuantity}`);
					}
				} catch (error) {
					console.error(`Error al actualizar la cantidad del artículo ${orderItem.articleId}`, error);
				}
			});

			navigate('/orders');
		} catch (error) {
			console.error('Error al editar la orden', error);
		}
	};

	const addOrder = (articleId, quantity) => {
		const updatedItems = order.items.map((item) => {
			if (item.id === articleId) {
				const article = articles.find((article) => article.id === articleId);
				if (article) {
					const priceWithoutTax = article.price * quantity;
					const taxAmount = (priceWithoutTax * (article.tax / 100));
					const priceWithTax = priceWithoutTax + taxAmount;

					return {
						...item,
						quantity: quantity,
						priceWithoutTax: priceWithoutTax,
						priceWithTax: priceWithTax,
					};
				}
			}
			return item;
		});

		setOrder({
			...order,
			items: updatedItems,
		});
	};

	const deleteItem = (index) => {
		const updatedItems = [...order.items];
		updatedItems.splice(index, 1);

		setOrder({
			...order,
			items: updatedItems,
		});
	};

	return (
		<main className="bg-orders bg-main text-center">
			<div>
				<Buttons btnclass={"btn-simple btn-general"} btntext={"Editar Pedido"} onClick={sendEditOrder}></Buttons>
				<Link to="/orders" className="btn btn-lightblue btn-general">{"<<"}</Link>
			</div>
			<h1 className="m-2">ID Pedido: {idEditOrder}</h1>
			<section>
				<table className="table">
					<thead>
						<tr>
							<th className="text-center align-middle p-2">Referencia</th>
							<th className="text-center align-middle p-2 d-none d-md-table-cell">Total sin impuesto</th>
							<th className="text-center align-middle p-2 d-none d-lg-table-cell">Total con impuesto</th>
							<th className="text-center align-middle p-2">Pedidos</th>
							<th className="text-center align-middle p-2 d-none d-md-table-cell">Disponibles</th>
							<th className="text-center align-middle p-2">Editar</th>
							<th className="text-center align-middle p-2 d-none d-md-table-cell">Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{order.items.map((item, index) => (
							<tr key={index}>
								<td className="text-center align-middle p-2">{item.reference}</td>
								<td className="text-center align-middle p-2 d-none d-md-table-cell">{item.priceWithoutTax.toFixed(2)}</td>
								<td className="text-center align-middle p-2 d-none d-lg-table-cell">{item.priceWithTax.toFixed(2)}</td>
								<td className="text-center align-middle p-2">{item.quantity}</td>
								<td className="text-center align-middle p-2 d-none d-md-table-cell">{getAvailableQuantity(item.id)}</td>
								<td>
									<ItemCount
										quantity={getAvailableQuantity(item.id) + item.quantity}
										onQuantityChange={(newQuantity) => addOrder(item.id, newQuantity)}
									/>
								</td>
								<td className='d-none d-md-table-cell'>
									<Buttons btnclass={"btn-orange btn-general"} btntext={"X"} onClick={() => deleteItem(index)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>

		</main>
	);
};

export default EditOrder;