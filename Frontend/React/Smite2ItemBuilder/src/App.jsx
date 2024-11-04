import NavBar from "./components/Navbar/NavBar.jsx"
import { Outlet } from "react-router-dom";

let items = null;
export async function loader() {
  if (items) return items;
  items = await GetItems();

  return items;
}

async function GetItems() {
  try {
    const response = await fetch('http://localhost:3000/api/items?format=true', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const items = await response.json();

    items.forEach(item => {
      if (item.Img) {
        item.Img = Buffer.from(item.Img, 'binary').toString('base64');
      }
    });

    return items;
  }
  catch (error) {
    console.error(error)
  }
}


export default function App() {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const tempItems = GetItems();
  //     setItems(tempItems);
  //   }
  //   fetchItems().catch(console.error);
  // }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

