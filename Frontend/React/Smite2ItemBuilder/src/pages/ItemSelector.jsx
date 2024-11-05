import { useLoaderData, useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

import ItemScrollMenu from "../components/ItemScrollMenu/ItemScrollMenu";
import ItemFilter from "../components/ItemFilter/ItemFilter";
import ItemInfo from "../components/ItemInfo/ItemInfo";
import ItemInfoPlaceholder from "../components/ItemInfo/ItemInfoPlaceholder";
// import RoleFilter from "../components/RoleFilter/RoleFilter";


export default function ItemSelector() {
    const [items, setItems] = useState(useLoaderData());
    const [itemRecipes, setItemsRecipes] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [build, updateBuild, selectedBuildSlot, setSelectedBuildSlot] = useOutletContext();
    const [selectedItem, setSelectedItem] = useState(build.get(selectedBuildSlot));

    useEffect(() => {
        async function handleSetItemRecipes() {
            if (itemRecipes) return;
            setItemsRecipes(await GetItemRecipes());
        }
        handleSetItemRecipes();
    }, [])

    async function GetItemRecipes() {
        try {
            const response = await fetch('http://localhost:3000/api/itemRecipes', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            return await response.json();
        }
        catch (error) {
            console.error(error)
        }
    }

    const HealingReductionItemNames = ["Ruinous Poison", "Brawler's Ruin", "Divine Ruin", "Ruinous Ankh"]
    function changeFilter(filterType) {
        if (filterType === "Clear") return setFilteredItems(null);
        if (filterType === "Healing Reduction") {
            return setFilteredItems(items.filter(i => HealingReductionItemNames.includes(i.Name)));
        }
        const filteredItems = items.filter(i => {
            let result = false;
            const iEntry = Object.entries(i);
            iEntry.forEach(([k, v]) => {
                if (k === filterType && v != null) result = true;
            });
            return result;
        })
        setFilteredItems(filteredItems);
    }

    return (
        <div className="container mb-4 py-2 rounded" style={{ background: "rgb(23,35,49)", minHeight: 650 }}>
            {/* <RoleFilter /> */}
            <div className="d-flex mt-2 text-light">
                <ItemFilter changeFilter={changeFilter} />
                <ItemScrollMenu items={(filteredItems || items)} setSelectedItem={setSelectedItem} />
                {selectedItem ? <ItemInfo item={selectedItem} itemRecipes={itemRecipes} /> : <ItemInfoPlaceholder />}
            </div>
        </div>
    );
}
