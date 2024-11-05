import ItemCategory from "./ItemCategory";
import ItemWOnclick from "./Item/ItemWOnclick.jsx"
import { Link, useOutletContext } from "react-router-dom";

export default function BuildPreview() {
    const [build, updateBuild, selectedBuildSlot, setSelectedBuildSlot] = useOutletContext();

    function changeSelectedBuildSlot(buildSlot) {
        setSelectedBuildSlot(buildSlot);
    }

    function createClickableItems() {
        let items = [];

        build.forEach((value, key) => {
            const item = value != null ?
                <Link key={key} to={`addItem`} style={{ textDecoration: "none" }} onClick={() => changeSelectedBuildSlot(key)}>
                    <ItemWOnclick item={value} />
                </Link>
                :
                <Link key={key} to={`addItem`} style={{ height: 99 }} onClick={() => changeSelectedBuildSlot(key)}>
                    <div style={{ width: 75, height: 75, background: "rgb(23, 35, 49)", outline: "2px solid rgb(221, 161, 70)" }}></div>
                </Link >
            items.push(item);
        })
        return items;
    }

    return (
        <div className="p-2 d-flex flex-column justify-content-center align-items-center border border-warning" style={{ color: "rgb(191, 183, 180)" }}>
            <div className="d-flex">
                <ItemCategory CategoryName="Starter" itemCount={3} />
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
            <div className="d-flex flex-wrap gap-4" style={{ width: 300 }}>
                {
                    createClickableItems()
                }
            </div>
            {/* <ItemCategory CategoryName="Damage" itemCount={6} />
            <ItemCategory CategoryName="Defensive" itemCount={6} />
            <ItemCategory CategoryName="Utility" itemCount={6} /> */}
        </div>
    );
}
