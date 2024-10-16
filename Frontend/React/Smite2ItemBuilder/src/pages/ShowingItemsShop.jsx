import Item from "../components/Item/ItemWDropdown";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import './ShowingItemsShop.css';

export default function ItemSelector() {
    const items = useLoaderData();

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

    return (
        <div className="container my-4 py-2 rounded" style={{ background: "rgb(23,35,49)" }}>
            <div className="Role-Filter gap-1 justify-content-between d-flex text-light">
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
            </div>

            <div className="d-flex mt-2 text-light">
                <div className="Item-Filter" style={{ width: 210 }}>
                    <div>
                        <img src="" alt="" />
                        Clear
                    </div>
                    <hr />
                    <div>
                        <img src="" alt="" />
                        Strength
                    </div>
                    <div>
                        <img src="" alt="" />
                        Intelligence
                    </div>
                    <hr />
                    <div>
                        <img src="" alt="" />
                        Attack Speed
                    </div>
                    <div>
                        <img src="" alt="" />
                        Lifesteal
                    </div>
                    <div>
                        <img src="" alt="" />
                        Critical Chance
                    </div>
                    <div>
                        <img src="" alt="" />
                        Penetration
                    </div>
                    <hr />
                    <div>
                        <img src="" alt="" />
                        Physical Protection
                    </div>
                    <div>
                        <img src="" alt="" />
                        Magical Protection
                    </div>
                    <div>
                        <img src="" alt="" />
                        Max Health
                    </div>
                    <div>
                        <img src="" alt="" />
                        Health Regen
                    </div>
                    <hr />
                    <div>
                        <img src="" alt="" />
                        Max Mana
                    </div>
                    <div>
                        <img src="" alt="" />
                        Mana Regen
                    </div>
                    <div>
                        <img src="" alt="" />
                        Healing Reduction
                    </div>
                    <div>
                        <img src="" alt="" />
                        Cooldown Rate
                    </div>
                    <hr />
                    <div>
                        <img src="" alt="" />
                        Active
                    </div>
                    <div>
                        <img src="" alt="" />
                        Passive
                    </div>
                </div>

                <div className="container rounded overflow-auto"
                    style={{ background: "rgb(23,35,49)", maxHeight: 675 }}>
                    <div className="d-flex flex-wrap gap-4 mt-1 justify-content-center">
                        {
                            items.map((item, i) => {
                                return <Item key={i} item={item} />
                            })
                        }
                    </div>
                </div >
            </div>


        </div>
    );
}