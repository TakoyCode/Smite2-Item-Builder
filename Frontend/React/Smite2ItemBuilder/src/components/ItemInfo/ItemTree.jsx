import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Item from "../Item/Item";
// import ItemWOnclick from "../Item/ItemWOnclick";

export default function ItemTree({ item, itemRecipes }) {
    const [items, setItems] = useState(useLoaderData());
    const [recipeItems, setRecipeItems] = useState([]);
    const [itemTree, setItemTree] = useState(null);

    useEffect(() => {
        const builtItemTree = buildItemTree(item.Id);
        setItemTree(builtItemTree);
    }, [item])

    // Helper function to find an item by it's id
    const findItemById = (itemId) => items?.find(item => item.Id === itemId);

    // Helper function to find the item recipe to an item via it's id
    const findRecipeByMainItemId = (itemId) => itemRecipes?.find(itemRecipe => itemRecipe.MainItemId === itemId);

    // Recursive function to help build the tree
    function buildItemTree(mainItemId) {
        const itemRecipe = findRecipeByMainItemId(mainItemId);

        // Base case
        if (!itemRecipe) {
            return { MainItemId: mainItemId, components: [] };
        }

        // Recursive case
        const itemTree = {
            MainItemId: itemRecipe.MainItemId,
            components: []
        };

        itemRecipe.Component1Id && itemRecipe.Component2Id ?
            itemTree.components.push(buildItemTree(itemRecipe.Component1Id), buildItemTree(itemRecipe.Component2Id)) :
            itemTree.components.push(buildItemTree(itemRecipe.Component1Id));

        // return finished item tree
        return itemTree;
    }

    // NOT WORKING CODE
    // function drawItemTreeRecursive(tree) {
    //     // Getting the main item from the tree object
    //     const mainItem = findItemById(tree.MainItemId);

    //     // Base case
    //     if (!tree.components || tree.components.length === 0) {
    //         return <ItemWOnclick item={mainItem} onClickFunction={null} />;
    //     }

    //     // Recursive case
    //     const itemTree =
    //         <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: "100%" }}>
    //             <ItemWOnclick item={mainItem} onClickFunction={null} />
    //             <div className="d-flex me-2">
    //                 {
    //                     tree.components.map((component, index) => (
    //                         drawItemTree(component)
    //                     ))
    //                 }
    //             </div>
    //         </div>

    //     // return finished item tree
    //     return itemTree;
    // }

    function drawUpViaComponentId(itemId) {
        const mainItem = findItemById(itemId);
        const itemRecipe = findRecipeByMainItemId(itemId);
        if (!itemRecipe || !itemRecipe.Component1Id && !itemRecipe.Component2Id) {
            return (
                <div className="d-flex flex-column align-items-center">
                    <Item item={mainItem} />
                    <div className="d-flex gap-3 justify-content-center" style={{ width: 166 }}></div>
                </div>
            )
        }
        else {
            const componentItem1 = itemRecipe.Component1Id ? findItemById(itemRecipe.Component1Id) : null;
            const componentItem2 = itemRecipe.Component2Id ? findItemById(itemRecipe.Component2Id) : null;

            return (
                <div className="d-flex flex-column align-items-center">
                    <Item item={mainItem} />
                    <div className="d-flex gap-3 justify-content-center" style={{ width: 166 }}>
                        {componentItem1 ? <Item item={componentItem1} /> : <></>}
                        {componentItem2 ? <Item item={componentItem2} /> : <></>}
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center rounded mt-3" style={{ height: "45%", background: " rgb(26, 40, 57)" }}>
            <div className="d-flex flex-column align-items-center">
                <Item item={item} />
                <div className="d-flex gap-3">
                    {(itemTree && itemTree.components[0]) ? drawUpViaComponentId(itemTree.components[0].MainItemId) : ""}
                    {(itemTree && itemTree.components[1]) ? drawUpViaComponentId(itemTree.components[1].MainItemId) : ""}
                </div>
            </div>
        </div>
    );
}

