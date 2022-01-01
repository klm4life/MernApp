import './App.css';
import {useState, useEffect } from "react"; 
import Axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [listOfItems, setListOfItems] = useState([]);

  const addItem = () => {
    Axios.post('https://grocery-list-mern.herokuapp.com//additem', {
      name: name, 
      amount: amount 
    }).then((response)=> {
      setListOfItems([...listOfItems, 
        {_id: response.data._id, name: name, amount: amount},
      ]);
    })
  };

  const updateItem = (id) => {
    const newAmount = prompt("Enter new amount: ");

    Axios.put('https://grocery-list-mern.herokuapp.com//update', { newAmount: newAmount, id: id}).then(() => {
      setListOfItems(listOfItems.map((val) => {
        return val._id === id 
        ? {_id: id, name: val.name, amount: newAmount} 
        : val
      }))
    })
  };

  const deleteItem = (id) => {
    Axios.delete(`https://grocery-list-mern.herokuapp.com//delete/${id}`).then(()=> {
      setListOfItems(listOfItems.filter((val)=> {
        return val._id !== id;
      }))
    })
  }

  useEffect(() => {
    Axios.get('https://grocery-list-mern.herokuapp.com//read')
    .then((response) => {
      setListOfItems(response.data)
    })
    .catch(() => {
      console.log("ERROR");
    });
  }, []);


  return (
    <div className="App">
      <div className = "inputs">
        <input 
        type = "text" placeholder='Item name...' 
        onChange={(event) => 
        {setName(event.target.value)
        }} 
        />
        <input 
        type = "number" placeholder='Item amount...'
        onChange={(event) => 
          {setAmount(event.target.value)
          }} 
        />

        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="listOfItems">
        {listOfItems.map((val) => {
          return (
            <div className="itemContainer">
            <div className="item">
              <h3>Item: {val.name}</h3>
              <h3>Amount: {val.amount}</h3>
            </div>
            <button 
              onClick={() => {
                updateItem(val._id);
              }}
              >
                Update
                </button>
            <button 
              id="removeButton"
              onClick={() => {
                deleteItem(val._id);
              }}
              >
                X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
