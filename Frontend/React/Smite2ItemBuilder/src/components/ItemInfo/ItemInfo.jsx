import ItemInfoPlaceholder from "./ItemInfoPlaceholder";
import "./ItemInfo.css"

export default function ItemInfo({ item }) {
    if (item === undefined || item === null) return ItemInfoPlaceholder();

    const itemEntry = Object.entries(item);
    const noShowProps = ["Name", "Id", "Tier", "Img", "Gold", "Passive", "Active"];
    const showPropsInPercent = ["Attack Speed", "divfesteal", "Critical Chance", "Penetration"];

    return (
        <div className="container text-center" style={{ width: "40%" }}>
            <div className="Item-Tree">Item Tree Showcase</div>
            <div className="Item-Info container" style={{ background: "rgb(26, 40, 57)" }}>
                <div>
                    <h3 className="fw-bold m-0"
                        style={{ color: "rgb(186, 190, 195)" }}>{item.Name}</h3>
                </div>
                {
                    itemEntry.map(([k, v], i) => {
                        if (!v) return;
                        if (noShowProps.includes(k)) return;
                        return (
                            <div key={i}>
                                <span className="" style={{ color: "rgb(186, 190, 195)" }}
                                >{v}{showPropsInPercent.includes(k) ? "%" : ""} {k}</span>
                            </div>
                        )
                    })
                }
                {
                    item.Passive != null || item.Active != null ? <div><hr className="" /></div> : ""
                }
                {
                    itemEntry.map(([k, v], i) => {
                        if (!v) return;
                        if (k === "Passive" || k === "Active") {
                            return (
                                <div key={i}>
                                    <span className="" style={{ color: "rgb(186, 190, 195)" }}
                                    >{k}: {v}</span>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
