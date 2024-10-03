// Making a basic mock of what i want it to look like
export default function ItemBuilder() {
    return (
        <div className="container bg-success">
            <h1 className="text-center">ITEM-BUILDER</h1>
            <div className="d-flex justify-content-center" width={200}>
                {Items()}
                {Statistics()}
            </div>
            <button>Save Build</button>
            <button>Clear Build</button>
        </div>
    );
}

function Statistics() {
    const stats = [
        "Strength", "Intelligence", "Penetration", "Lifesteal", "Physical Protection",
        "Magical Protection", "Attack Speed", "Move Speed", "Critical Chance",
        "Attack DMG", "Health", "Health Regen", "Mana", "Mana Regen",
        "CDR", "CCR", "DMG Reduction"
    ]

    return (
        <div className="border border-warning">
            <h3 className="text-center">Statistics</h3>
            <div className="container-sm justify-content-between" style={{ maxWidth: 450 }}>
                <div className="row row-cols-2 gx-5">
                    {stats.map((stat, i) => (
                        <div className="col" key={i}>{stat}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Items() {
    return (
        <div className="border border-warning">
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
        </div>
    );
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


