export default function SelectedItemInfo({ item, noShowProps, showPropsInPercent }) {
    const itemEntry = Object.entries(item);

    return (
        <div className="Item-Info rounded mt-3 p-4" style={{ height: "45%", background: " rgb(26, 40, 57)" }}>
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
    );
}