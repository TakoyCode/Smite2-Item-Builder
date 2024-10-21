import Item from "../components/Item/ItemWDropdown";
import ItemScrollMenu from "../components/ItemScrollMenu/ItemScrollMenu";
import ItemFilter from "../components/ItemFilter/ItemFilter";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import './ShowingItemsShop.css';

export default function ItemSelector() {
    const [items, setItems] = useState(useLoaderData());
    const [filteredItems, setFilteredItems] = useState(null);

    const [chosenRoleFilter, setChosenRoleFilter] = useState("All");

    const changeChosenRoleFilter = (event) => setChosenRoleFilter(event.target.innerText)

    const HealingReductionItemNames = ["Ruinous Poison", "Brawler's Ruin", "Divine Ruin", "Ruinous Ankh"]
    function changeFilter(filterType) {
        if (filterType === "Clear") return setFilteredItems(null);
        if (filterType === "Healing Reduction") {
            return setFilteredItems(items.filter(i => HealingReductionItemNames.includes(i.Name)));
        }
        const filteredItems = items.filter(i => {
            let result = false;
            const iEntry = Object.entries(i);
            iEntry.forEach(([k, v]) => {
                if (k === filterType && v != null) result = true;
            });
            return result;
        })
        setFilteredItems(filteredItems);
    }

    const activeRole = {
        backgroundColor: "rgb(34, 51, 73)",
        border: "1px solid rgb(19, 29, 41)",
    }
    const inActiveRole = {
        backgroundColor: "rgb(19, 29, 41)",
        border: "1px solid rgb(34, 51, 73)",
    }

    return (
        <div className="container my-4 py-2 rounded" style={{ background: "rgb(23,35,49)", height: 650 }}>
            {/* <div className="Role-Filter gap-1 justify-content-between d-flex text-light">
                <div className="flex-fill text-center" onClick={changeChosenRoleFilter}
                    style={chosenRoleFilter === "All" ? activeRole : inActiveRole}>All</div>
                <div className="flex-fill text-center" onClick={changeChosenRoleFilter}
                    style={chosenRoleFilter === "Adc" ? activeRole : inActiveRole}>Adc</div>
                <div className="flex-fill text-center" onClick={changeChosenRoleFilter}
                    style={chosenRoleFilter === "Jungle" ? activeRole : inActiveRole}>Jungle</div>
                <div className="flex-fill text-center" onClick={changeChosenRoleFilter}
                    style={chosenRoleFilter === "Mid" ? activeRole : inActiveRole}>Mid</div>
                <div className="flex-fill text-center" onClick={changeChosenRoleFilter}
                    style={chosenRoleFilter === "Solo" ? activeRole : inActiveRole}>Solo</div>
                <div className="flex-fill text-center" onClick={changeChosenRoleFilter}
                    style={chosenRoleFilter === "Support" ? activeRole : inActiveRole}>Support</div>
            </div> */}

            <div className="d-flex mt-2 text-light">
                <ItemFilter changeFilter={changeFilter} />
                <ItemScrollMenu items={(filteredItems || items)} />
            </div>
        </div>
    );
}
