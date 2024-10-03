import ItemSelector from "./components/ItemSelector.jsx"
import NavBar from "./components/Navbar/NavBar.jsx"
import ItemBuilder from "./pages/ItemBuilder"
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetItems();
    async function GetItems() {
      try {
        const response = await fetch('http://localhost:3000/api/items', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        setItems(await response.json());
      }
      catch (error) {
        console.error(error)
      }
    }
  }, []);


  return (
    <>
      <NavBar />
      {/* <ItemBuilder /> */}
      <ItemSelector items={items} />
    </>
  )
}

export default App
