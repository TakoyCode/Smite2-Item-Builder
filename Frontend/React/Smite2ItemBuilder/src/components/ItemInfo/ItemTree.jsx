import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ItemWOnclick from "../Item/ItemWOnclick";

export default function ItemTree({ item, itemRecipes }) {
    const [items, setItems] = useState(useLoaderData());
    const [itemRecipe, setItemRecipe] = useState(null);
    const [recipeItems, setRecipeItems] = useState([]);

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
        const itemRecipe = itemRecipes.find((recipe) => recipe.MainItemId === item.Id)
        if (itemRecipe) setItemRecipe(itemRecipe);
        else setItemRecipe(null);
    }

    return (
        <div className="Item-Tree text-center rounded mt-4" style={{ height: "45%", background: " rgb(26, 40, 57)" }}>
            <div>Item Tree Showcase</div>
            {
                recipeItems?.map((item, index) => {
                    if (item) {
                        return <ItemWOnclick key={index} item={item} onClickFunction={null} />
                    }
                })
            }
        </div>
    );
}