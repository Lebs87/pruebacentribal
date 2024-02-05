import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Buttons from "../commons/Buttons";
import Loading from "../commons/Loading";
import { getOrders, deleteOrder } from "../../services/config/frontController";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      }
      catch (error) { 'Error fetching data:', error }
      finally { setTimeout(() => setLoading(false), 500) }
    };
    fetchData();
  }, []);
  if (loading) { return <Loading /> }

  const updateArticlesAfterOrderDeletion = async (orderId) => {
    try {
      const order = orders.find((order) => order.id === orderId);
  
      if (order) {
        const articleIds = order.items.map((item) => item.id);
        const articlePromises = articleIds.map(async (id) => {
          const articleResponse = await axios.get(`http://localhost:3001/articles/${id}`);
          return articleResponse.data;
        });
        const orderArticles = await Promise.all(articlePromises);
  
        for (let i = 0; i < order.items.length; i++) {
          const orderItem = order.items[i];
          const article = orderArticles[i];
  
          if (article) {
            const newQuantity = article.quantity + orderItem.quantity;
            await axios.put(`http://localhost:3001/articles/${article.id}`, {
              ...article,
              quantity: newQuantity,
            });
  
            console.log(`Cantidad de ${article.name} actualizada a ${newQuantity}`);
          }
        }
      }
    } catch (error) {
      console.error('Error al actualizar los artículos después de eliminar la orden:', error);
    }
  };
  
  const deleteOrderService = async (orderId) => {
    try {
      const order = orders.find((order) => order.id === orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
  
      if (order) {
        await updateArticlesAfterOrderDeletion(orderId);
        await deleteOrder(orderId);
        console.log('Orden eliminada con éxito');
      }
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
    }
  };

  return (
    <main className="bg-orders bg-main">
      <Buttons btnclass={"btn-orange btn-general"} btntext={"Nuevo Pedido"} onClick={() => navigate('/newOrder')}></Buttons>
      <h1 className="m-2">Lista de Pedidos</h1>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center align-middle p-2">Identificador</th>
              <th className="text-center align-middle p-2 d-none d-sm-table-cell">Precio sin impuesto</th>
              <th className="text-center align-middle p-2 d-none d-sm-table-cell">Precio con impuesto</th>
              <th className="text-center align-middle p-2">Editar</th>
              <th className="text-center align-middle p-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="text-center align-middle p-2">{order.id}</td>
                <td className="text-center align-middle p-2 d-none d-sm-table-cell">{order.totalPriceWithoutTax.toFixed(2)}</td>
                <td className="text-center align-middle p-2 d-none d-sm-table-cell">{order.totalPriceWithTax.toFixed(2)}</td>
                <td>
                  <Buttons btnclass={"btn-simple btn-general"} btntext={"Editar"} onClick={() => navigate(`/editOrder/${order.id}`)}></Buttons>
                </td>
                <td>
									<Buttons btnclass={"btn-orange btn-general"} btntext={"X"} onClick={() => deleteOrderService(order.id)}/>
								</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Orders
