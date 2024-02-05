import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as newID } from 'uuid';
import PropTypes from 'prop-types';
import { getArticles } from "../../services/config/frontController";
import Buttons from "../commons/Buttons";
import Loading from "../commons/Loading";
import ItemCount from "./ItemCount";

const NewOrder = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const shortID = () => newID().slice(0, 8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      }
      catch (error) { 'Error fetching data:', error }
      finally { setLoading(false) }
    };
    fetchData();
  }, []);
  if (loading) { return <Loading /> }

  const availableArticles = articles.filter((article) => article.quantity > 0);
  const outOfStockArticles = articles.filter((article) => article.quantity === 0);

  const addOrder = ({ article, quantity }) => {
    const existingOrderIndex = orders.findIndex((order) => order.articleId === article.id);
    if (existingOrderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].quantity = quantity;

      setOrders(updatedOrders);
    } else {
      const order = {
        articleId: article.id,
        reference: article.reference,
        quantity: quantity,
        priceWithoutTax: article.price * quantity,
        priceWithTax: (article.price * quantity) * (1 + article.tax / 100),
      };

      setOrders([...orders, order]);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();
    let totalPriceWithoutTax = 0;
    let totalPriceWithTax = 0;
    const orderItems = [];

    const hasSelectedItems = orders.some((order) => order.quantity > 0);

    if (!hasSelectedItems) {
      console.error('No se pueden crear órdenes sin artículos seleccionados.');
      return;
    }

    orders.forEach((order) => {
      const article = articles.find((article) => article.id === order.articleId);

      if (article && order.quantity > 0) {
        const articlePriceWithoutTax = article.price * order.quantity;
        const articlePriceWithTax = articlePriceWithoutTax * (1 + article.tax / 100);

        orderItems.push({
          id: article.id,
          reference: article.reference,
          quantity: order.quantity,
          priceWithoutTax: articlePriceWithoutTax,
          priceWithTax: articlePriceWithTax,
        });

        totalPriceWithoutTax += articlePriceWithoutTax;
        totalPriceWithTax += articlePriceWithTax;
      }
    });

    const formData = {
      id: `${shortID()}`,
      items: orderItems,
      totalPriceWithoutTax: totalPriceWithoutTax,
      totalPriceWithTax: totalPriceWithTax,
    };

    try {
      const response = await axios.post('http://localhost:3001/orders', formData);
      console.log('Orden creada con éxito', response.data);
      orders.forEach(async (order) => {
        try {
          const article = articles.find((article) => article.id === order.articleId);

          if (article && order.quantity > 0) {
            const newQuantity = article.quantity - order.quantity;

            await axios.put(`http://localhost:3001/articles/${article.id}`, {
              ...article,
              quantity: newQuantity,
            });

            console.log(`Cantidad de ${article.name} actualizada a ${newQuantity}`);
          }
        } catch (error) {
          console.error(`Error al actualizar la cantidad del artículo ${order.articleId}`, error);
        }
      });

      navigate('/orders');
    } catch (error) {
      console.error('Error al crear la orden', error);
    }
  };

  return (
    <main className="bg-orders bg-main text-center">
      <div>
        <Buttons btnclass={"btn-simple btn-general"} btntext={"Crear Pedido"} onClick={createOrder}></Buttons>
        <Link to="/orders" className="btn btn-lightblue btn-general">{"<<"}</Link>
      </div>
      <h1 className="m-2">Lista de Artículos Disponibles</h1>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center align-middle p-2">Referencia</th>
              <th className="text-center align-middle p-2 d-none d-sm-table-cell">Nombre</th>
              <th className="text-center align-middle p-2 d-none d-md-table-cell">Precio</th>
              <th className="text-center align-middle p-2 d-none d-lg-table-cell">Impuesto</th>
              <th className="text-center align-middle p-2">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {availableArticles.map((article) => (
              <tr key={article.id}>
                <td className="text-center align-middle p-2">{article.reference}</td>
                <td className="text-center align-middle p-2 d-none d-sm-table-cell">{article.name}</td>
                <td className="text-center align-middle p-2 d-none d-md-table-cell">{article.price}</td>
                <td className="text-center align-middle p-2 d-none d-lg-table-cell">{article.tax}</td>
                <td>
                  <ItemCount
                    quantity={article.quantity}
                    onQuantityChange={(newQuantity) => addOrder({ article, quantity: newQuantity })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div>
        <Buttons btnclass={"btn-simple btn-general"} btntext={"Crear Pedido"} onClick={createOrder}></Buttons>
        <Link to="/orders" className="btn btn-lightblue btn-general">{"<<"}</Link>
      </div>
      {(outOfStockArticles.length > 0) ?
        <>
          <h1 className="m-2">Lista de Artículos Sin Stock</h1>
          <section>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center align-middle p-2">Referencia</th>
                  <th className="text-center align-middle p-2 d-none d-sm-table-cell">Nombre</th>
                  <th className="text-center align-middle p-2 d-none d-md-table-cell">Precio</th>
                  <th className="text-center align-middle p-2 d-none d-lg-table-cell">Impuesto</th>
                </tr>
              </thead>
              <tbody>
                {outOfStockArticles.map((article) => (
                  <tr key={article.id}>
                    <td className="text-center align-middle p-2">{article.reference}</td>
                    <td className="text-center align-middle p-2 d-none d-sm-table-cell">{article.name}</td>
                    <td className="text-center align-middle p-2 d-none d-md-table-cell">{article.price}</td>
                    <td className="text-center align-middle p-2 d-none d-lg-table-cell">{article.tax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </> : <h3>¡Todos los artículos están disponibles!</h3>}
    </main>
  )
}

NewOrder.propTypes = {
  notify: PropTypes.func.isRequired,
};
export default NewOrder
