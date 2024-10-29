import ItemCategory from "./ItemCategory";
import Item from "./Item/Item.jsx"
import { Link } from "react-router-dom";

export default function BuildPreview({ build }) {

    function createFillerItems() {
        let fillerItems = [];

        for (let index = build.length; index < 6; index++) {

            fillerItems.push(
                <Link key={index} style={{ width: 75, height: 75, background: "rgb(23, 35, 49)", outline: "2px solid rgb(221, 161, 70)" }}
                    to={`addItem/${index}`}></Link>
            )
        }

        return fillerItems;
    }

    return (
        <div className="p-2 d-flex flex-column justify-content-center align-items-center border border-warning" style={{ color: "rgb(191, 183, 180)" }}>
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
            <div className="d-flex flex-wrap gap-4" style={{ width: 300 }}>
                {
                    build.map((item, i) => (
                        <Link key={i} to={`addItem/${i}`} style={{ textDecoration: "none" }}>
                            <Item item={item} />
                        </Link>
                    ))
                }
                {
                    createFillerItems()
                }
            </div>
            {/* <ItemCategory CategoryName="Damage" itemCount={6} />
            <ItemCategory CategoryName="Defensive" itemCount={6} />
            <ItemCategory CategoryName="Utility" itemCount={6} /> */}
        </div>
    );
}
