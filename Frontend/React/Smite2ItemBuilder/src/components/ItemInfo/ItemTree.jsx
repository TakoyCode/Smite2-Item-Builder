import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ItemWOnclick from "../Item/ItemWOnclick";

export default function ItemTree({ item, itemRecipes }) {
    const [items, setItems] = useState(useLoaderData());
    const [itemRecipe, setItemRecipe] = useState(null);
    const [recipeItems, setRecipeItems] = useState([]);
    const [itemTree, setSetItemTree] = useState([]);

    // ["ItemMain", ["Component1", ["Component1.1"]], ["Component2"]]

    // {
    //     item: item...,
    //     components: ["Component1", "Component2"],
    // }

    useEffect(() => {
        getItemRecipe();
    }, [item])

    useEffect(() => {
        getRecipeItems();
    }, [itemRecipe])

    function getRecipeItems() {
        if (itemRecipe) {
            let recipeItemsTemp = [];
            for (let [key, value] of Object.entries(itemRecipe)) {
                if (key === "Id") continue;
                const recipeItem = items.find((item) => item.Id === value);
                recipeItemsTemp.push(recipeItem ? recipeItem : null)
            }
            setRecipeItems(recipeItemsTemp);
        }
        else setRecipeItems([]);
    }

    function getItemRecipe() {
        const itemRecipeTemp = itemRecipes?.find((recipe) => recipe.MainItemId === item.Id)
        if (itemRecipeTemp) setItemRecipe(itemRecipeTemp);
        else setItemRecipe(null);
    }

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