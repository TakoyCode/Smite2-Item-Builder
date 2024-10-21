import Statistics from "../components/Statistics";
import BuildPreview from "../components/BuildPreview";

// Making a basic mock of what i want it to look like
export default function ItemBuilder() {
    return (
        <div className="container bg-success">
            <h1 className="text-center">ITEM-BUILDER</h1>
            <div className="d-flex justify-content-center" width={200}>
                <BuildPreview />
                <Statistics />
            </div>
            <button>Save Build</button>
            <button>Clear Build</button>
        </div>
    );
}