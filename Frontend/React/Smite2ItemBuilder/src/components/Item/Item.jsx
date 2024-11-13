export default function Item({ item, selected = false }) {
    if (item === undefined) return;
    return (
        <div style={{ width: 75 }} className="p-2">
            <img src={`data:image/png;base64,${item.Img}`} alt={item.Name}
                style={{
                    height: 75,
                    outline: selected ? "4px solid rgb(221, 161, 70)" : "2px solid rgb(221, 161, 70)"
                }} />
        </div>
    );
}