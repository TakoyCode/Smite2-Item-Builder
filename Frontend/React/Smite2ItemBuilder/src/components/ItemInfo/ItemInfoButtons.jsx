import { Link, useOutletContext } from "react-router-dom";
import "./ItemInfoButtons.css";

export default function ItemInfoButtons({ item }) {
    const [build, updateBuild, selectedBuildSlot, setSelectedBuildSlot] = useOutletContext();

    function addItemToBuild() {
        updateBuild(selectedBuildSlot, item);
    }

    function removeItemFromBuild() {
        updateBuild(selectedBuildSlot, null);
    }

    function isItemInBuildSlot() {
        if (build.get(selectedBuildSlot) === item) return true;
        return false;
    }

    function canAddItemToBuild() {
        if (item.Tier === 3) {
            let response = false;

            build.forEach((value, key) => {
                if (value === item) response = true;
            });
            return response;
        }
        return false;
    }

    return (
        <div className="d-flex justify-content-between">
            <Link className={`btn btn-add ${canAddItemToBuild() || build.get(selectedBuildSlot) === item ? "disabled" : ""}`}
                style={{ width: "48%" }} to=".." onClick={addItemToBuild}>Add</Link>
            <Link className={`btn btn-remove ${isItemInBuildSlot() ? "" : "disabled"}`}
                style={{ width: "48%" }} to=".." onClick={removeItemFromBuild}>Remove</Link>
        </div>
    );
}