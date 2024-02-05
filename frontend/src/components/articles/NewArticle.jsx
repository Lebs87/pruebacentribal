import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Buttons from "../commons/Buttons";

const NewArticle = () => {
  const navigate = useNavigate();

  const createArticle = async (e) => {
    e.preventDefault()
    const formData = {
      reference: document.getElementById('reference').value,
      name: document.getElementById('name').value,
      price: parseFloat(document.getElementById('price').value),
      description: document.getElementById('description').value,
      tax: parseFloat(document.getElementById('tax').value),
      quantity: parseInt(document.getElementById('quantity').value),
    };

    try {
      const response = await axios.post('http://localhost:3001/articles', formData);
      console.log('Artículo creado con éxito', response.data);
      navigate('/')
    } catch (error) {
      console.error('Error al crear el artículo', error);
    }
  };

  return (
    <main className="bg-articles">
      <div className="bg-main justify-content-center text-center">
        <form className="flex-column">
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Referencia</div>
              <input type="text" className="form-control" id="reference"></input>
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Nombre</div>
              <input type="text" className="form-control" id="name"></input>
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Precio</div>
              <input type="number" className="form-control" id="price"></input>
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Impuesto</div>
              <input type="number" className="form-control" id="tax"></input>
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <div className="input-group-text">Cantidad</div>
              <input type="number" className="form-control" id="quantity"></input>
            </div>
          </div>
          <div className="col my-2">
            <div className="input-group">
              <span className="input-group-text">Descripción</span>
              <textarea className="form-control" id="description"></textarea>
            </div>
          </div>
          <div className="col-12 my-2">
            <Buttons btnclass={"btn-simple btn-general"} btntext={"Crear Artículo"} onClick={createArticle}></Buttons>
            <Link to="/" className="btn btn-lightblue btn-general">{"<<"}</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default NewArticle
