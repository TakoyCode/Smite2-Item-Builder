export default function ItemInfoPlaceholder() {
    return (
        <div className="container text-center rounded d-flex flex-column" style={{ width: "40%", background: "rgb(19, 29, 41)" }}>
            <div className="rounded mt-3" style={{ height: "45%", background: "rgb(26, 40, 57)" }}></div>
            <div className="rounded mt-3" style={{ height: "45%", background: "rgb(26, 40, 57)" }}></div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-add" style={{ width: "48%" }} disabled={true}>Add</button>
                <button className="btn btn-remove" style={{ width: "48%" }} disabled={true}>Remove</button>
            </div>
        </div>
    );
}