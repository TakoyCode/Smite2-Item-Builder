export default function ItemDiv({ Item }) {
    if (Item === undefined) return;
    console.log(Item)

    return (
        <div style={{ width: 75 }}>
            <img src={`data:image/png;base64,${Item.Img}`} alt={Item.Name}
                style={{ height: 75, width: "100%", float: "left", }} />
            <div className="text-center">{Item.Gold}</div>
        </div>
    );
}