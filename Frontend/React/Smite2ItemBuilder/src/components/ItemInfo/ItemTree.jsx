import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ItemWOnclick from "../Item/ItemWOnclick";

export default function ItemTree({ item, itemRecipes }) {
    const [items, setItems] = useState(useLoaderData());
    const [recipeItems, setRecipeItems] = useState([]);
    const [itemTree, setItemTree] = useState([]);

    // ["ItemMain", ["Component1", ["Component1.1"]], ["Component2"]]

    // {
    //     item: item...,
    //     components: ["Component1", "Component2"],
    // }

    useEffect(() => {
        const builtItemTree = buildItemTree(item.Id);
        setItemTree(builtItemTree);
    }, [item])

    useEffect(() => console.log(drawItemTree(itemTree)), [itemTree])

    // Helper to find an item by ID
    const findItemById = (id) => items.find(item => item.Id === id);

    // Helper to find the recipe by MainItemId
    const findRecipeByMainItemId = (id) => itemRecipes.find(recipe => recipe.MainItemId === id);

    // Recursive function to build the tree
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

    function drawItemTree(tree) {
        const mainItemId = tree.MainItemId;
        const mainItem = findItemById(mainItemId);

        // Base case
        if (!tree.components) {
            return <ItemWOnclick item={mainItem} onClickFunction={null} />;
        }

        // Recursive case
        const itemTree = [<ItemWOnclick item={mainItem} onClickFunction={null} />];

        // let component1 = "";
        // let component2 = "";
        if (tree.components[0]) {
            // component1 = drawItemTree(tree.components[0]);
            itemTree.push(drawItemTree(tree.components[0]));
        }
        if (tree.components[1]) {
            // component2 = drawItemTree(tree.components[1]);
            itemTree.push(drawItemTree(tree.components[1]));
        }

        // const itemTree = [
        //     <div className="d-flex justify-content-evenly">
        //         {component1}
        //         {component2}
        //     </div>
        // ]

        // return finished item tree
        return itemTree;
    }

    return (
        <div className="Item-Tree text-center rounded mt-4" style={{ height: "45%", background: " rgb(26, 40, 57)" }}>
            <div className="d-flex flex-column align-items-center mt-3">
                {/* <div className="d-flex justify-content-evenly">
                    <ItemWOnclick item={item} onClickFunction={null} />
                </div>
                <div className="d-flex justify-content-evenly">
                    {
                        itemTree.components?.map((componentTree, index) => {
                            const itemId = componentTree.MainItemId;
                            const item = findItemById(itemId);
                            return <ItemWOnclick key={index} item={item} onClickFunction={null} />
                        })
                    }
                </div>
                <div className="d-flex justify-content-evenly">
                    {
                        itemTree.components?.map((componentTree) => componentTree.components)
                        // ?.map((componentTree, index) => {
                        //     console.log(componentTree)
                        //     const itemId = componentTree.MainItemId;
                        //     console.log(itemId)
                        //     const item = findItemById(itemId);
                        //     return <ItemWOnclick key={index} item={item} onClickFunction={null} />
                        // })
                    }
                </div> */}
                {
                    drawItemTree(itemTree)

                }
            </div>

        </div>
    );
}