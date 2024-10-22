import ItemInfoPlaceholder from "./ItemInfoPlaceholder";
import "./ItemInfo.css"

export default function ItemInfo({ item }) {
    if (item === undefined || item === null) return <ItemInfoPlaceholder />;

    const itemEntry = Object.entries(item);
    const noShowProps = ["Name", "Id", "Tier", "Img", "Gold", "Passive", "Active"];
    const showPropsInPercent = [
        "Attack Speed", "divfesteal", "Critical Chance",
        "Physical Penetration", "Magical Penetration", "Movement Speed"
    ];

    return (
        <div className="container rounded" style={{ width: "40%", background: "rgb(19, 29, 41)" }}>
            <div className="Item-Tree text-center rounded mt-4">Item Tree Showcase</div>
            <div className="Item-Info rounded mt-3 p-4">
                <h3 className="fw-bold" style={{ color: "rgb(186, 190, 195)" }}>{item.Name}</h3>
                {
                    itemEntry.map(([k, v], i) => {
                        if (!v) return;
                        if (noShowProps.includes(k)) return;
                        return (
                            <div className="mt-1" key={i}>
                                <img src={`./src/assets/StatIcons/S2_Stat_${k.replaceAll(" ", "")}.png`} alt="" className="me-1" style={{ height: 25 }} />
                                <span style={{ color: "rgb(186, 190, 195)" }}
                                >{v}{showPropsInPercent.includes(k) ? "%" : ""} {k}</span>
                            </div>
                        )
                    })
                }
                {
                    item.Passive != null || item.Active != null ? <div><hr /></div> : ""
                }
                {
                    itemEntry.map(([k, v], i) => {
                        if (!v) return;
                        if (k === "Passive" || k === "Active") {
                            return (
                                <div key={i}>
                                    <img src={`./src/assets/StatIcons/S2_Stat_${k.replaceAll(" ", "")}.png`} alt="" className="me-1" style={{ height: 25 }} />
                                    <span style={{ color: "rgb(186, 190, 195)" }}>{k}: {v}</span>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
