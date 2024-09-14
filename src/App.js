import Todo from "./pages/Todo";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Register from "./pages/Regsiter";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState } from "react";
function App() {
  const todoData = [
    {
      key: 1,
      title: "item 1",
      description: "item 1 description",
      completed:false
    },
    {
      key: 2,
      title: "item 2",
      description: "item 2 description",
      completed:false
    },
    {
      key: 3,
      title: "item 3",
      description: "item 3 description",
      completed:false
    },
  ];

  const usersData = [
    {
      email: "vinothk1997@gmail.com",
      password: "test123",
      name: "vinoth",
    },
    {
      email: "kamal@gmail.com",
      password: "test123",
      name: "kamal",
    },
  ];

  const [users, setUsers] = useState(usersData);
  const [isDublicate,setIsDublicate] = useState(false);
  function handleAddUsers(user) {
    const checkDublicate = users.filter(u=>u.email===user.email);
    console.log(checkDublicate);
    if(checkDublicate.length>1){
      setIsDublicate(true);
      return true;
    }
    else{
      setIsDublicate(false);
      setUsers([...users, user]);
      return false;
    }
    return true;
  }

  function login(loggedUser) {
    const user = users.find(
      (user) =>
        user.email === loggedUser.email && user.password === loggedUser.password
    );
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Todo todoData={todoData} />} />
        <Route
          path="/register"
          element={<Register handleAddUsers={handleAddUsers} isDublicate={isDublicate}/>}
        />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
