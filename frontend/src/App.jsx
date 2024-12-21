import React, {useState, useEffect} from 'react'
import './App.css'
import Axios from "axios";
import Card from "./components/card";

function App() {

    const baseUrl = "http://localhost:3001"

    const [values, setValues] = useState();
    const [games, setGames] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/register`, {
            name: values.name,
            synopsis: values.synopsis,
            cost: values.cost,
            isbn: values.isbn,
            pageNumber: values.pageNumber,
            categoryId: values.categoryId,
            auteurId: values.auteurId,    
            parutionDate: values.parutionDate,       
            image: values.image,      
        }).then((response) =>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        });

    }

    useEffect(() => {
        Axios.get(`${baseUrl}/games`)
            .then((response)=>{
            setGames(response.data)
        })

        },[]
    )


  return (
    <div className="App">
      <div className="container">
          <h1 className="title">Bibliothèque</h1><br/>
          <h3>Ajouter un livre</h3>
          <div className="register-box">
              <input className="register-input" type="text" name="name" placeholder="Title" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="synopsis" placeholder="Synopsis" onChange={handleChangeValues} />        
              <input className="register-input" type="number" name="cost" placeholder="cost" onChange={handleChangeValues} />
              <input className="register-input" type="number" name="isbn" placeholder="ISBN" onChange={handleChangeValues} />
              <input className="register-input" type="number" name="pageNumber" placeholder="Nombre de pages" onChange={handleChangeValues} />
              <input className="register-input" type="date" name="parutionDate" placeholder="date de parution" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="image" placeholder="URL de l'image" onChange={handleChangeValues} />



              <select className="register-input" name="categoryId" id="categorie-select" onChange={handleChangeValues}>
                <option value="">--Catégorie--</option>    
                <option value="1">Action</option>    
                <option value="2">Romance</option>
                <option value="3">Drame</option>
              </select>

              <select className="register-input" name="auteurId" id="auteur-select" onChange={handleChangeValues}>
                <option value="">--Auteur--</option>
                <option value="1">Victor-Hugo</option>
                <option value="2">Emile Zola</option>
                <option value="3">Guy de Maupassant</option>
              </select>

              <button className="register-button" onClick={handleClickButton}>Add</button>
          </div>

          <br/>
          <br/>
          <br/>
          <br/>
          <h1>Livre déja éxistant</h1>
          <br/>
          <br/>

          <div className="cards">
              {typeof games !== 'undefined' &&
                  games.map((game) => {
                      return <Card
                          key={game.idgames}
                          id={game.idgames}
                          name={game.name}
                          cost={game.cost}
                          category={game.category}

                      >
                      </Card>;
                  })}
          </div>
      </div>
    </div>
  )
}

export default App
