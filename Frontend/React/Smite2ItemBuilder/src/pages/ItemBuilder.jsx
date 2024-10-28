import Statistics from "../components/Statistics";
import BuildPreview from "../components/BuildPreview";
import { useState } from "react";
import { Outlet } from "react-router-dom";


// Making a basic mock of what i want it to look like
export default function ItemBuilder() {

    const [build, setBuild] = useState([]);

    const handleSaveBuild = () => { return; }
    const handleClearBuild = () => { setBuild([]); }


    return (
        <div>
            <div className="container bg-success">
                <h1 className="text-center">ITEM-BUILDER</h1>

                <div className="d-flex justify-content-center" width={200}>
                    <BuildPreview />
                    <Statistics />
                </div>

                <button onClick={handleSaveBuild}>Save Build</button>
                <button onClick={handleClearBuild}>Clear Build</button>
            </div>
        </div>
    );
}