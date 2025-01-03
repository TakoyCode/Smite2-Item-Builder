import ItemWOnclick from "../Item/ItemWOnclick";
import "./ItemScrollMenu.css"
export default function ItemScrollMenu({ items = [], setSelectedItem }) {

    function handleSetSelectedItem(item) {
        setSelectedItem(item)
    }

    return (
        <div className={"container rounded overflow-auto Item-Container"}
            style={{ background: "rgb(23,35,49)", maxHeight: 640, maxWidth: 410, margin: 0 }}>
            <div className="d-flex flex-wrap gap-4 mt-2">
                {
                    items.map((item, i) => {
                        return <ItemWOnclick key={i} item={item} onClickFunction={() => handleSetSelectedItem(item)} />
                    })
                }
            </div>
        </div>
    );
}