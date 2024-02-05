import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Buttons from "../commons/Buttons";

const EditArticle = () => {
  const { idArticle } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    reference: '',
    name: '',
    price: 0,
    description: '',
    tax: 0,
    quantity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/articles/${idArticle}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del artículo', error);
      }
    };

    fetchData();
  }, [idArticle]);

  const editArticle = async (e) => {
    e.preventDefault();

    const formData = {
      reference: document.getElementById('reference').value,
      name: document.getElementById('name').value,
      price: parseFloat(document.getElementById('price').value),
      description: document.getElementById('description').value,
      tax: parseFloat(document.getElementById('tax').value),
      quantity: parseInt(document.getElementById('quantity').value),
    };

    try {
      const response = await axios.put(`http://localhost:3001/articles/${idArticle}`, formData);
      console.log('Artículo editado con éxito', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error al editar el artículo', error);
    }
  };

  const deleteArticle = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:3001/articles/${idArticle}`);
      console.log('Artículo eliminado con éxito');
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar el artículo', error);
    }
  };

  const handleInputChange = (e) => {
    setArticle({
      ...article,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main className="bg-articles">
      <div className="bg-main justify-content-center text-center">
        <form className="flex-column">
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Referencia</div>
              <input type="text" className="form-control" id="reference" value={article.reference} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Nombre</div>
              <input type="text" className="form-control" id="name" value={article.name} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Precio</div>
              <input type="number" className="form-control" id="price" value={article.price} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Impuesto</div>
              <input type="number" className="form-control" id="tax" value={article.tax} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Cantidad</div>
              <input type="number" className="form-control" id="quantity" value={article.quantity} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <span className="input-group-text">Descripción</span>
              <textarea className="form-control" id="description" value={article.description} onChange={handleInputChange}></textarea>
            </div>
          </div>
          <div className="col-12 my-2">
            <Buttons btnclass={"btn-simple btn-general"} btntext={"Editar Artículo"} onClick={editArticle} />
            <Buttons btnclass={"btn-orange btn-general"} btntext={"Eliminar Artículo"} onClick={deleteArticle} />
            <Link to="/" className="btn btn-lightblue btn-general">{"<<"}</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditArticle;
