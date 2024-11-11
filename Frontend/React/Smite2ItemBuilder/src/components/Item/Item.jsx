export default function Item({ item }) {
    if (item === undefined) return;
    return (
        <div style={{ width: 75 }} className="p-2">
            <img src={`data:image/png;base64,${item.Img}`} alt={item.Name} className="Item-Image"
                style={{ height: 75, outline: "2px solid rgb(221, 161, 70)" }} />
        </div>
    );
}