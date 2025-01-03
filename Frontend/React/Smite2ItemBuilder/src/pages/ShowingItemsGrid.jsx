import Item from "../components/Item/ItemWDropdown";
import { useLoaderData } from "react-router-dom";

export default function ItemSelector() {
    const items = useLoaderData();

    return (
        <div className="container mb-4 rounded" style={{ background: "rgb(23,35,49)" }}>
            <div className="d-flex flex-wrap gap-4 py-4 justify-content-center">
                {
                    items.map((item, i) => {
                        return <Item key={i} item={item} />
                    })
                }
            </div>
        </div >
    );
}