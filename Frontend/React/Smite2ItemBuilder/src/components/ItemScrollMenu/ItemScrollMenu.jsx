import Item from "../Item/Item";
import "./ItemScrollMenu.css"

export default function ItemScrollMenu({ items = [], setSelectedItem }) {
    return (
        <div className={"container rounded overflow-auto Item-Container"}
            style={{ background: "rgb(23,35,49)", maxHeight: 640, maxWidth: 410, margin: 0 }}>
            <div className="d-flex flex-wrap gap-4 mt-2">
                {
                    items.map((item, i) => {
                        return <Item key={i} item={item} setSelectedItem={setSelectedItem} />
                    })
                }
            </div>
        </div >
    );
}