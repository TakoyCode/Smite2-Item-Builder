export default function ItemSelector(props) {
    return (
        <div className="container mt-4 bg-dark text-bg-dark">
            {props.items.map((item) => {
                const EntryItem = Object.entries(item);
                return (
                    <div key={item.Id} className="mb-4">
                        {EntryItem.map(([k, v], i) => {
                            if (v != null && k !== "Id") {
                                return <div>{k === "Name" ? "" : k + ":"} {v}</div>
                            }
                        })}
                    </div>
                )
            })}
        </div >
    );
}