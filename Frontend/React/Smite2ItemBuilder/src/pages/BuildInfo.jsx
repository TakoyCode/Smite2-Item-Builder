import Statistics from "../components/Statistics";
import BuildPreview from "../components/BuildPreview";
import { useOutletContext } from "react-router-dom";


export default function BuildInfo() {
    const [build, setBuild] = useOutletContext();

    const handleSaveBuild = () => { return; }
    const handleClearBuild = () => { setBuild([]); }

    return (
        <div>
            <div className="container" style={{ backgroundColor: "rgb(23, 35, 49)" }}>
                <h1 className="text-center">ITEM-BUILDER</h1>

                {/* {
                    build.map((item, i) => <div key={i}>{item.Name}</div>)
                } */}

                <div className="d-flex justify-content-center" width={200}>
                    <BuildPreview build={build} />
                    <Statistics />
                </div>

                <button onClick={handleSaveBuild}>Save Build</button>
                <button onClick={handleClearBuild}>Clear Build</button>
            </div>
        </div>
    );
}