// Making a basic mock of what i want it to look like
function ItemBuilder() {
    return (
        <div className="container bg-success">
            <h1 className="text-center">ITEM-BUILDER</h1>
            <div>
                {Items()}
                <div className="border border-warning" height={200}>
                    <h3>Statistics</h3>
                </div>

                <button>Save Build</button>
                <button>Clear Build</button>
            </div>
        </div>
    );
}

export default ItemBuilder

function Items() {
    return <div className="border border-warning">
        <div className="d-flex">
            {ItemCategory("Damage", 3)}
            <div>
                <div>info</div>
                <div className="d-flex">
                    <div>
                        <img src="" alt="God img" />
                        <div className="m-2">God name</div>
                    </div>
                    <div>
                        <img src="" alt="Role img" />
                        <div className="m-2">Role name</div>
                    </div>
                </div>
            </div>
        </div>
        {ItemCategory("Damage", 6)}
        {ItemCategory("Defensive", 6)}
        {ItemCategory("Utility", 6)}
    </div>;
}

function ItemCategory(CategoryName, itemCount) {
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


