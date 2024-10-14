import "./Item.css"

export default function ItemDiv({ Item }) {
    if (Item === undefined) return;

    return (
        <div style={{ width: 75 }}>
            <img src={`data:image/png;base64,${Item.Img}`} alt={Item.Name}
                className="Item-Image" />
            <div className="text-center Item-Text fw-bold">{Item.Gold}</div>
        </div>
    );
}