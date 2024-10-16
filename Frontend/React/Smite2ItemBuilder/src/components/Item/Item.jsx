import "./Item.css"

export default function ItemDiv({ item }) {
    if (item === undefined) return;
    return (
        <div style={{ width: 75 }}>
            <img src={`data:image/png;base64,${item.Img}`} alt={item.Name} className="Item-Image" />

            <div className="text-center Item-Text fw-bold">{item.Gold}</div>
        </div>
    );
}