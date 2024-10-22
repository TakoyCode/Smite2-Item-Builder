import 'bootstrap/dist/js/bootstrap.bundle.js';
import "./ItemWDropdown.css"


export default function ItemDiv({ item }) {
    if (item === undefined) return;

    const itemEntry = Object.entries(item);
    const noShowProps = ["Name", "Id", "Tier", "Img", "Gold", "Passive", "Active"];
    const showPropsInPercent = [
        "Attack Speed", "divfesteal", "Critical Chance",
        "Physical Penetration", "Magical Penetration", "Movement Speed"
    ];

    return (
        <div className="dropdown-center" style={{ width: 75 }}>
            <img src={`data:image/png;base64,${item.Img}`} alt={item.Name}
                className="Item-Image dropdown-toggle"
                data-bs-toggle="dropdown" data-bs-auto-close="outside"
                aria-expanded="false" />

            <ul className="dropdown-menu text-center" style={{ background: "rgb(26, 40, 57)", width: 250 }}>
                <li>
                    <h3 className="dropdown-item-text fw-bold m-0"
                        style={{ color: "rgb(186, 190, 195)" }}>{item.Name}</h3>
                </li>
                {
                    itemEntry.map(([k, v], i) => {
                        if (!v) return;
                        if (noShowProps.includes(k)) return;
                        return (
                            <li key={i}>
                                <span className="dropdown-item-text" style={{ color: "rgb(186, 190, 195)" }}
                                >{v}{showPropsInPercent.includes(k) ? "%" : ""} {k}</span>
                            </li>
                        )
                    })
                }
                {
                    item.Passive != null || item.Active != null ? <li><hr className="dropdown-divider" /></li> : ""
                }
                {
                    itemEntry.map(([k, v], i) => {
                        if (!v) return;
                        if (k === "Passive" || k === "Active") {
                            return (
                                <li className='container d-flex' key={i}>
                                    <span className="dropdown-item-text" style={{ color: "rgb(186, 190, 195)" }}
                                    >{k}: {v}</span>
                                </li>
                            )
                        }
                    })
                }
            </ul>
            <div className="text-center Item-Text fw-bold">{item.Gold}</div>
        </div>
    );
}