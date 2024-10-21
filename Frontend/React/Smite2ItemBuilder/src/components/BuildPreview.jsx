import ItemCategory from "./ItemCategory";

export default function BuildPreview() {
    return (
        <div className="border border-warning">
            <div className="d-flex">
                <ItemCategory CategoryName="Starter" itemCount={3} />
                <div>
                    <div>info</div>
                    <div className="d-flex">
                        <div>
                            <img src="" alt="God img" />
                            <div className="m-2">God name</div>
                        </div>
                        <div>
                            <img src="" alt="Role img" />
                            <div className="m-2">Role name</div>
                        </div>
                    </div>
                </div>
            </div>
            <ItemCategory CategoryName="Damage" itemCount={6} />
            <ItemCategory CategoryName="Defensive" itemCount={6} />
            <ItemCategory CategoryName="Utility" itemCount={6} />
        </div>
    );
}
