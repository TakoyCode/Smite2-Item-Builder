import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ItemWOnclick from "../Item/ItemWOnclick";

export default function ItemTree({ item, itemRecipes }) {
    const [items, setItems] = useState(useLoaderData());
    const [itemRecipe, setItemRecipe] = useState(null);
    const [recipeItems, setRecipeItems] = useState([]);
    // const [itemTree, setSetItemTree] = useState([]);

    // ["ItemMain", ["Component1", ["Component1.1"]], ["Component2"]]

    // {
    //     item: item...,
    //     components: ["Component1", "Component2"],
    // }

    useEffect(() => {
        console.log(buildTree(item.Id));
    }, [])

    // Helper to find an item by ID
    const findItemById = (id) => items.find(item => item.id === id);

    // Helper to find the recipe by MainItemId
    const findRecipeByMainItemId = (id) => itemRecipes.find(recipe => recipe.MainItemId === id);

    // Recursive function to build the tree
    function buildTree(mainItemId) {
        const itemRecipe = findRecipeByMainItemId(mainItemId);

        if (!itemRecipe) {
            // return { MainItemId: mainItemId, components: [] };
            return [mainItemId];
        }

        const tree = [itemRecipe.MainItemId, []]

        // const tree = {
        //     MainItemId: itemRecipe.MainItemId,
        //     components: []
        // };

        if (itemRecipe.Component1Id) {
            // tree.components.push(buildTree(itemRecipe.Component1Id));
            (tree[1]).push(buildTree(itemRecipe.Component1Id));
        }
        if (itemRecipe.Component2Id) {
            // tree.components.push(buildTree(itemRecipe.Component2Id));
            (tree[1]).push(buildTree(itemRecipe.Component2Id));
        }

        return tree;
    }


    // function getItemTree(itemId) {
    //     const itemTree = [];
    //     // Find recipe that creates item
    //     const MainItemRecipe = itemRecipes?.find((recipe) => recipe.MainItemId === itemId);

    //     if (MainItemRecipe) {
    //         console.log(MainItemRecipe)

    //         for (const [key, componentId] of Object.entries(MainItemRecipe)) {
    //             if (key === "Id" || key === "MainItemId" || componentId === null) continue;

    //             const foundComponentRecipe = itemRecipes?.find((recipe) => recipe.MainItemId === componentId);
    //             if (foundComponentRecipe) {
    //                 console.log(foundComponentRecipe)

    //                 for (const [key, componentId] of Object.entries(foundComponentRecipe)) {
    //                     if (key === "Id" || key === "MainItemId" || componentId === null) continue;

    //                     const foundComponentComponentRecipe = itemRecipes?.find((recipe) => recipe.MainItemId === componentId);
    //                     if (foundComponentComponentRecipe) {
    //                         console.log(foundComponentComponentRecipe)
    //                     }
    //                 }
    //             }

    //         }
    //     }
    // }

    // useEffect(() => {
    //     getItemRecipe();
    // }, [item])

    // useEffect(() => {
    //     getRecipeItems();
    // }, [itemRecipe])

    // function getRecipeItems() {
    //     if (itemRecipe) {
    //         let recipeItemsTemp = [];
    //         for (let [key, value] of Object.entries(itemRecipe)) {
    //             if (key === "Id") continue;
    //             const recipeItem = items.find((item) => item.Id === value);
    //             recipeItemsTemp.push(recipeItem ? recipeItem : null)
    //         }
    //         setRecipeItems(recipeItemsTemp);
    //     }
    //     else setRecipeItems([]);
    // }

    // function getItemRecipe() {
    //     const itemRecipeTemp = itemRecipes?.find((recipe) => recipe.MainItemId === item.Id)
    //     if (itemRecipeTemp) setItemRecipe(itemRecipeTemp);
    //     else setItemRecipe(null);
    // }

    return (
        <div className="Item-Tree text-center rounded mt-4" style={{ height: "45%", background: " rgb(26, 40, 57)" }}>
            <div className="d-flex flex-column align-items-center mt-3">
                <div className="d-flex justify-content-evenly">
                    {
                        recipeItems?.map((item, index) => {
                            if (item?.Tier === 3) {
                                return <ItemWOnclick key={index} item={item} onClickFunction={null} />
                            }
                        })
                    }
                </div>
                <div className="d-flex justify-content-evenly">
                    {
                        recipeItems?.map((item, index) => {
                            if (item?.Tier === 2) {
                                return <ItemWOnclick key={index} item={item} onClickFunction={null} />
                            }
                        })
                    }
                </div>
                <div className="d-flex justify-content-evenly">
                    {
                        recipeItems?.map((item, index) => {
                            if (item?.Tier === 1) {
                                return <ItemWOnclick key={index} item={item} onClickFunction={null} />
                            }
                        })
                    }
                </div>
            </div>

        </div>
    );
}