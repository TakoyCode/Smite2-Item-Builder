import { useState } from "react";
import { Outlet } from "react-router-dom";

// Making a basic mock of what i want it to look like
export default function ItemBuilder() {
    const [build, setBuild] = useState([]);

    return (
        <Outlet context={[build, setBuild]} />
    );
}