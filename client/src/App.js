import './App.css';
import {useState, useEffect } from "react"; 
import Axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [listOfItems, setListOfItems] = useState([]);

  const addItem = () => {
    Axios.post('http://localhost:3001/additem', {
      name: name, 
      amount: amount 
    })
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
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
      {listOfItems.map((val)=> {
        return (
        <div> 
          {" "}
          {val.name}  {val.amount}
        </div>
        );
      })}
    </div>
  );
}

export default App;
