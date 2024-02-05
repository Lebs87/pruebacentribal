import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles } from "../../services/config/frontController";
import Buttons from "../commons/Buttons";
import Loading from "../commons/Loading";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      }
      catch (error) { 'Error fetching data:', error }
      finally { setTimeout(() => setLoading(false), 500) }
    };
    fetchData();
  }, []);
  if (loading) { return <Loading /> }

  return (
    <main className="bg-articles bg-main">
      <Buttons btnclass={"btn-orange btn-general"} btntext={"Crear Artículo"} onClick={() => navigate('/newArticle')}></Buttons>
      <h1 className="m-2">Lista de Artículos</h1>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center align-middle p-2">Referencia</th>
              <th className="text-center align-middle p-2">Nombre</th>
              <th className="text-center align-middle p-2 d-none d-sm-table-cell">Precio sin impuesto</th>
              <th className="text-center align-middle p-2">Editar</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="text-center align-middle p-2">{article.reference}</td>
                <td className="text-center align-middle p-2">{article.name}</td>
                <td className="text-center align-middle p-2 d-none d-sm-table-cell">{article.price}</td>
                <td>
                  <Buttons btnclass={"btn-simple btn-general"} btntext={"Editar Artículo"} onClick={() => navigate(`/editArticle/${article.id}`)}></Buttons>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Articles