export default function Statistics() {
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