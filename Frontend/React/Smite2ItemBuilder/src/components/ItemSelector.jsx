import ItemDiv from "./Item/Item";
import { useLoaderData } from "react-router-dom";

export default function ItemSelector() {
    const items = useLoaderData();

    return (
        <div className="container mt-4 bg-dark text-bg-dark">
            <div className="d-flex flex-wrap gap-4 py-4 justify-content-center">
                {
                    items.map((item, i) => {
                        return <ItemDiv key={i} Item={item} />
                    })
                }
            </div>
        </div >
    );
}