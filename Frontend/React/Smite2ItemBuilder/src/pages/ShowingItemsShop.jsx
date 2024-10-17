import Item from "../components/Item/ItemWDropdown";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
// import "../assets/image.png"

import './ShowingItemsShop.css';

export default function ItemSelector() {
    const [items, setItems] = useState(useLoaderData());
    const [filteredItems, setFilteredItems] = useState(null);

    const [chosenRoleFilter, setChosenRoleFilter] = useState("All");

    const changeChosenRoleFilter = (event) => setChosenRoleFilter(event.target.innerText)

    const activeRole = {
        backgroundColor: "rgb(34, 51, 73)",
        border: "1px solid rgb(19, 29, 41)",
    }
    const inActiveRole = {
        backgroundColor: "rgb(19, 29, 41)",
        border: "1px solid rgb(34, 51, 73)",
    }

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

    return (
        <div className="container my-4 py-2 rounded" style={{ background: "rgb(23,35,49)" }}>
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
                <div className="Item-Filter" style={{ width: 210 }}>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_All.png" alt="" />
                        Clear
                    </div>
                    <hr />
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_Strength.png" alt="" />
                        Strength
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_Intelligence.png" alt="" />
                        Intelligence
                    </div>
                    <hr />
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_AttackSpeed.png" alt="" />
                        Attack Speed
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_Lifesteal.png" alt="" />
                        Lifesteal
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_CriticalChance.png" alt="" />
                        Critical Chance
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_MagicalPen.png" alt="" />
                        Penetration
                    </div>
                    <hr />
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_PhysicalProtection.png" alt="" />
                        Physical Protection
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_MagicalProtection.png" alt="" />
                        Magical Protection
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_MaxHealth.png" alt="" />
                        Max Health
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_HealthRegen.png" alt="" />
                        Health Regen
                    </div>
                    <hr />
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_MaxMana.png" alt="" />
                        Max Mana
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_ManaRegen.png" alt="" />
                        Mana Regen
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_HealingReduction.png" alt="" />
                        Healing Reduction
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_CooldownRate.png" alt="" />
                        Cooldown Rate
                    </div>
                    <hr />
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_Active.png" alt="" />
                        Active
                    </div>
                    <div onClick={(e) => changeFilter(e.target.innerText)}>
                        <img src=".\src\assets\StatIcons\S2_Stat_Passive.png" alt="" />
                        Passive
                    </div>
                </div>

                <div className="container rounded overflow-auto"
                    style={{ background: "rgb(23,35,49)", maxHeight: 625, maxWidth: 550, margin: 0 }}>
                    <div className="d-flex flex-wrap gap-4 mt-1 justify-content-center">
                        {
                            (filteredItems || items).map((item, i) => {
                                return <Item key={i} item={item} />
                            })
                        }
                    </div>
                </div >
            </div>
        </div>
    );
}