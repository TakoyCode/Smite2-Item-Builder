export default function ItemDiv({ Item }) {
    if (Item === undefined) return;

    let base64String = "";
    if (Item.Img) {
        base64String = btoa(String.fromCharCode(...Item.Img.data));
        // base64String = btoa(String.fromCharCode(...new Uint8Array(Item.Img.data)));
        // base64String = Buffer.from(String.fromCharCode(...new Uint8Array(Item.Img.data)), 'base64');
        // base64String = Item.Img.ToString('base64')
    }

    return (
        <div style={{ width: 75 }}>
            <img src={`data:image/png;base64,${base64String}`} alt={Item.Name}
                style={{ height: 75, width: "100%", float: "left", }} />
            <div className="text-center">{Item.Gold}</div>
        </div>
    );
}