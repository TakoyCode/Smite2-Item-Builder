import { useState } from "react";
import { Outlet } from "react-router-dom";

// Making a basic mock of what i want it to look like
export default function ItemBuilder() {
    const [build, setBuild] = useState(new Map([
        ["Item1", null],
        ["Item2", null],
        ["Item3", null],
        ["Item4", null],
        ["Item5", null],
        ["Item6", null],
    ]));

    return (
        <Outlet context={[build, setBuild]} />
    );
}