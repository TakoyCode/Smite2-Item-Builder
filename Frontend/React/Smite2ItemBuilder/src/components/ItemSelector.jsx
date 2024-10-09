import ItemDiv from "./Item";

export default function ItemSelector(props) {
    return (
        <div className="container mt-4 bg-dark text-bg-dark">
            <div className="d-flex flex-wrap gap-4 py-4 justify-content-center">
                {
                    props.items.map((item, i) => {
                        return <ItemDiv key={i} Item={item} />
                    })
                }
            </div>
        </div >
    );
}