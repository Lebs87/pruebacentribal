import Articles from '../../components/articles/Articles.jsx';
import EditArticle from '../../components/articles/EditArticle.jsx';
import NewArticle from '../../components/articles/NewArticle.jsx';
import Orders from '../../components/orders/Orders.jsx';
import EditOrder from '../../components/orders/EditOrder.jsx';
import NewOrder from '../../components/orders/NewOrder.jsx';

const publicRoutes = [
  { path: '/', component: Articles },
  { path: '/editArticle/:idArticle', component: EditArticle },
  { path: '/newArticle', component: NewArticle },
  { path: '/orders', component: Orders },
  { path: '/editOrder/:idEditOrder', component: EditOrder },
  { path: '/newOrder', component: NewOrder },
];

export default publicRoutes;
