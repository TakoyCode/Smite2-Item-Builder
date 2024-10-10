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

        const tempItems = await response.json();

        tempItems.forEach(item => {
          if (item.Img) {
            console.log(item)
            // base64String = btoa(String.fromCharCode(...Item.Img.data));
            // base64String = btoa(String.fromCharCode(...new Uint8Array(Item.Img.data)));
            item.Img = Buffer.from(item.Img, 'binary').toString('base64');
          }
        });

        setItems(tempItems);
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
