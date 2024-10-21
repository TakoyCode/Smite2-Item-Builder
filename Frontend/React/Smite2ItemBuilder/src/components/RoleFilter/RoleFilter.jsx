import { useState } from "react";
import "./RoleFilter.css"

export default function RoleFilter() {
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
    );
}