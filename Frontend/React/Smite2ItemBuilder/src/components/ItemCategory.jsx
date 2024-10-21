export default function ItemCategory({ CategoryName, itemCount }) {
    let items = [];
    for (let i = 0; i < itemCount; i++) {
        items.push(`Item ${i + 1}`);
    }

    return (
        <div>
            <div>{CategoryName}</div>
            <div className="d-flex">
                {
                    items.map((item, index) =>
                        <div className="m-2" key={index}>{item}</div>
                    )
                }
            </div>
        </div>
    );
}