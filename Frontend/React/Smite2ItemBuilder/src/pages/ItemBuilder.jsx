import { useState } from "react";
import { Outlet } from "react-router-dom";

// Making a basic mock of what i want it to look like
export default function ItemBuilder() {
    const [build, setBuild] = useState(new Map([
        ["item1", null],
        ["item2", null],
        ["item3", null],
        ["item4", null],
        ["item5", null],
        ["item6", null],
    ]));

    const [selectedBuildSlot, setSelectedBuildSlot] = useState("item1");

    const updateBuild = (key, value) => {
        setBuild(new Map(build.set(key, value)));
    }

    return (
        <Outlet context={[build, updateBuild, selectedBuildSlot, setSelectedBuildSlot]} />
    );
}