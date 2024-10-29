import { Link, useOutletContext } from "react-router-dom";
import ItemInfoPlaceholder from "./ItemInfoPlaceholder";
import "./ItemInfo.css"

export default function ItemInfo({ item }) {
    if (item === undefined || item === null) return <ItemInfoPlaceholder />;

    const [build, setBuild] = useOutletContext();

    const itemEntry = Object.entries(item);
    const noShowProps = ["Name", "Id", "Tier", "Img", "Gold", "Passive", "Active"];
    const showPropsInPercent = [
        "Attack Speed", "Lifesteal", "Critical Chance",
        "Physical Penetration", "Magical Penetration", "Movement Speed"
    ];

    function addItemToBuild() {
        if (build.length >= 6) return;
        setBuild([...build, item])
    }

    function removeItemFromBuild() {

    }

    return (
        <div className="container rounded d-flex flex-column" style={{ width: "40%", background: "rgb(19, 29, 41)", position: "relative" }}>
            <div className="Item-Tree text-center rounded mt-4">Item Tree Showcase</div>
            <div className="Item-Info rounded mt-3 p-4">
                <h3 className="fw-bold" style={{ color: "rgb(186, 190, 195)" }}>{item.Name}</h3>
                <div>
                    {
                        itemEntry.map(([k, v], i) => {
                            if (!v) return;
                            if (noShowProps.includes(k)) return;
                            return (
                                <div className="mt-1" key={i}>
                                    <img src={`/StatIcons/S2_Stat_${k.replaceAll(" ", "")}.png`} alt="" className="me-1" style={{ height: 25 }} />
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
                                        <img src={`/StatIcons/S2_Stat_${k.replaceAll(" ", "")}.png`} alt="" className="me-1" style={{ height: 25 }} />
                                        <span style={{ color: "rgb(186, 190, 195)" }}>{k}: {v}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="d-flex  justify-content-between">
                <Link className="btn btn-add" style={{ width: "48%" }} disabled={false} to=".." onClick={addItemToBuild}>Add</Link>
                <Link className="btn btn-remove" style={{ width: "48%" }} disabled={false} to=".." onClick={removeItemFromBuild}>Remove</Link>
            </div>
        </div >
    )
}
