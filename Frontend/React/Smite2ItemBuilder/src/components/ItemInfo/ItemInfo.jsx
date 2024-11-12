import SelectedItemInfo from "./SelectedItemInfo";
import ItemInfoButtons from "./ItemInfoButtons";
import ItemTree from "./ItemTree";

export default function ItemInfo({ item, itemRecipes }) {
    const noShowProps = ["Name", "Id", "Tier", "Img", "Gold", "Passive", "Active"];
    const showPropsInPercent = [
        "Attack Speed", "Lifesteal", "Critical Chance",
        "Physical Penetration", "Magical Penetration", "Movement Speed"
    ];

    return (
        <div className="container rounded d-flex flex-column" style={{ width: "40%", background: "rgb(19, 29, 41)" }}>
            <ItemTree item={item} itemRecipes={itemRecipes} />
            <SelectedItemInfo item={item} noShowProps={noShowProps} showPropsInPercent={showPropsInPercent} />
            <ItemInfoButtons item={item} />
        </div >
    )
}