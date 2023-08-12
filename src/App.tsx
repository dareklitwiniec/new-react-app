
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import { useEffect, useState } from "react";
import './App.css';
import Like from "./components/Like";
import Form from "./components/Form";
import './index.css';
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import axios, { AxiosError } from 'axios';


interface User {
  id: number;
  name: string;

}


function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState(' ');

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const res = await axios.get<User[]>('http://jsonplaceholder.typicode.com/users')

        setUsers(res.data);
      }
      catch (err) {
        setError((err as AxiosError).message)
      }


    }
    fetchUsers();


    // .then(res => setUsers(res.data))
    // .catch(err => setError(err.message));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('')
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'aaa', amount: 10, category: 'Utilities' },
    { id: 2, description: 'bbb', amount: 10, category: 'Utilities' },
    { id: 3, description: 'ccc', amount: 10, category: 'Utilities' },
    { id: 4, description: 'ddd', amount: 10, category: 'Utilities' },
  ]);



  let items = [
    'New York',
    'Warszawa',
    'Gdańsk',
    'Biłgoraj',
    'Poznań',
  ];
  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
  });

  const handleClick = () => {
    setDrink({ ...drink, price: 6 });
  };




  let name = 'Bocian';

  const handleSelectItem = (item: string) => {
    console.log(item);
  }
  const [alertVisible, setAlertVisibility] = useState(false)

  const visibleExpenses = selectedCategory ? expenses.filter((e) => e.category === selectedCategory) : expenses;

  return (
    <div>
      {error && <p className="text-danger">{error}
      </p>}
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <div className="mb-5">
        <ExpenseForm onSubmit={expense => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={category => setSelectedCategory(category)} />
      </div>
      <ExpenseList expenses={visibleExpenses} onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))} />
      <Form />
      {drink.price}
      <button onClick={handleClick}>Click Me</button>

      <Like onClick={() => console.log('clicked')} />

      {alertVisible && <Alert onClose={() => setAlertVisibility(false)}> My Alert</Alert>}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>My Button A</Button>
      {alertVisible && <Alert onClose={() => setAlertVisibility(false)}>Hello <span>{name}</span></Alert>}

      <ListGroup items={items} heading="Miasta" onSelectItem={handleSelectItem} />
    </div >
  );
}

export default App;