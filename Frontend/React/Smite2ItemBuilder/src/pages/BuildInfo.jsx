import Statistics from "../components/Statistics";
import BuildPreview from "../components/BuildPreview";
import { useOutletContext } from "react-router-dom";


export default function BuildInfo() {
    const [build, updateBuild] = useOutletContext();

    const handleSaveBuild = () => { return; }
    const handleClearBuild = () => {
        build.forEach((value, key) => {
            updateBuild(key, null)
        });
    }

    function checkIfBuildIsEmpty() {
        let buildEmpty = true;
        for (const value of build.values()) {
            if (value) buildEmpty = false;
        };
        return buildEmpty;
    }

    return (
        <div>
            <div className="container p-4 rounded" style={{ backgroundColor: "rgb(23, 35, 49)" }}>
                <div className="d-flex flex-column">
                    <h1 className="text-center">ITEM-BUILDER</h1>

                    {/* {
                        build.map((item, i) => <div key={i}>{item.Name}</div>)
                    } */}
                    <div className="d-flex gap-4 justify-content-center" width={200}>
                        <BuildPreview build={build} />
                        <Statistics build={build} />
                    </div>

                    <div className="d-flex gap-3 mt-3">
                        <button className="btn" onClick={handleSaveBuild} disabled={true}>Save Build</button>
                        <button className="btn" onClick={handleClearBuild} disabled={checkIfBuildIsEmpty()}>Clear Build</button>
                    </div>
                </div>
            </div>
        </div>
    );
}