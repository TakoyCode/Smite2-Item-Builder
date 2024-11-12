import { useEffect, useState } from "react";

export default function Statistics({ build }) {
    const [buildStats, setBuildStats] = useState({});

    useEffect(() => {
        updateBuildStats()
    }, [build])

    function updateBuildStats() {
        const stats = {};
        for (const [itemSlot, item] of build.entries()) {
            if (!item) continue;
            for (const [key, value] of Object.entries(item)) {
                if (!value) continue;
                if (typeof (value) == "string" || key === "Id" || key === "Tier") continue;

                if (stats[key]) stats[key] = stats[key] + value;
                else stats[key] = value;
            }
        }
        setBuildStats(stats);
    }

    const stats = [
        "Strength", "Intelligence", "Physical Penetration", "Magical Penetration", "Lifesteal",
        "Physical Protection", "Magical Protection", "Attack Speed", "Movement Speed", "Critical Chance",
        "Attack DMG", "Max Health", "Health Regen", "Max Mana", "Mana Regen",
        "Cooldown Rate", "CCR", "DMG Reduction"
    ]

    const showPropsInPercent = [
        "Attack Speed", "Lifesteal", "Critical Chance",
        "Physical Penetration", "Magical Penetration", "Movement Speed"
    ];

    return (
        <div className="d-flex flex-column rounded" style={{ outline: "2px solid rgb(221, 161, 70)" }}>
            <h3 className="text-center pt-3">Statistics</h3>
            <ul style={{ backgroundColor: "white" }}></ul>
            <div className="container p-3 pt-0">
                <div className="row align-items-end row-cols-2" style={{ maxWidth: 500 }}>
                    {stats.map((stat, i) => {
                        return (
                            <div key={i} className="col d-flex gap-1 align-items-center" style={{ maxWidth: 250 }}>
                                <img src={
                                    ["Attack DMG", "CCR", "DMG Reduction"].includes(stat) ?
                                        `/StatIcons/S2_Stat_All.png` :
                                        `/StatIcons/S2_Stat_${stat.replaceAll(" ", "")}.png`
                                }
                                    alt={stat} style={{ width: 30, height: 30, }} />
                                <div>{stat}:</div>
                                <div className="buildStats ms-auto">
                                    {buildStats[stat] ? buildStats[stat] : 0}
                                    {showPropsInPercent.includes(stat) ? "%" : ""}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}