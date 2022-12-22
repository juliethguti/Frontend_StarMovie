import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { API_URL } from "../../util/Util";




export const MovieForm=()=>{

    const [formData, setFormData] = useState({
        name: null,
        description: null,
        trailerLink: null,
        imageLink: null,
        categories: null,
        categories: null,
      });
      
      useEffect(() => {
        getCategoriesAsync();
      }, []);

      const [categories, setCategories] = useState([]);

      const getCategoriesAsync = async () => {
        let response = await fetch(API_URL + "category");
        response = await response.json();
        setCategories(response);
      };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((values) => ({ ...values, [name]: value }));
        /*if (name=='categoryList'){
          setFormData((values) => ({ ...values, [name]: {id : value }));
        }else{
          setFormData((values) => ({ ...values, [name]: value }));
        }*/
        
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        //const response = await sendMovietApi();
        console.log(`response`, formData);
      };

      const sendMovieApi = async () => {
        const requestData = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        };
        let response = await fetch(API_URL + "movie", requestData);
        response = await response.json();
        return response;
      };

    return (
        <div className="container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre Película</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
        
            <Form.Group className="mb-3" controlId="formBasicTrailerLink">
              <Form.Label>Link Trailer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link Trailer de la película"
                name="trailerLink"
                onChange={handleChange}
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicImageLink">
              <Form.Label>Link imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link imagen de la película"
                name="imageLink"
                onChange={handleChange}
              />
              {/*<Form.Text className="text-muted">
                No compartiremos el email con nadie más
              </Form.Text>*/}
            </Form.Group>

            <Form.Select name='categoryList' aria-label="Defaul select example" onChange={handleChange}>
              <option>Seleccione la categoría</option>
              {categories.map((item,idx)=>(
                <option key={idx} value={item.name}>{item.name}</option>
              ))}
            </Form.Select>
               
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {/* <Link to="/">Ya tengo una cuenta</Link> */}
        </div>
    );
}
