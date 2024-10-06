export default function ItemDiv(props) {
    if (props.Item === undefined) return;
    // const Item = Object.entries(props.Item)
    // console.log(Item)
    return (
        <div style={{ width: 75 }}>
            <img src={props.Item.Img} alt={props.Item.Name}
                style={{ height: 75, width: "100%", float: "left", }} />
            <div className="text-center">{props.Item.Gold}</div>
        </div>
    );
}