import './ItemFilter.css'

export default function ItemFilter({ changeFilter }) {
    const filterCategories = [
        [
            { imgFileName: "S2_Stat_All.png", fieldName: "Clear" },
        ],
        [
            { imgFileName: "S2_Stat_Strength.png", fieldName: "Strength" },
            { imgFileName: "S2_Stat_Intelligence.png", fieldName: "Intelligence" },
        ],
        [
            { imgFileName: "S2_Stat_AttackSpeed.png", fieldName: "Attack Speed" },
            { imgFileName: "S2_Stat_Lifesteal.png", fieldName: "Lifesteal" },
            { imgFileName: "S2_Stat_CriticalChance.png", fieldName: "Critical Chance" },
            { imgFileName: "S2_Stat_PhysicalPenetration.png", fieldName: "Physical Penetration" },
            { imgFileName: "S2_Stat_MagicalPenetration.png", fieldName: "Magical Penetration" },
        ],
        [
            { imgFileName: "S2_Stat_PhysicalProtection.png", fieldName: "Physical Protection" },
            { imgFileName: "S2_Stat_MagicalProtection.png", fieldName: "Magical Protection" },
            { imgFileName: "S2_Stat_MaxHealth.png", fieldName: "Max Health" },
            { imgFileName: "S2_Stat_HealthRegen.png", fieldName: "Health Regen" },
        ],
        [
            { imgFileName: "S2_Stat_MaxMana.png", fieldName: "Max Mana" },
            { imgFileName: "S2_Stat_ManaRegen.png", fieldName: "Mana Regen" },
            { imgFileName: "S2_Stat_HealingReduction.png", fieldName: "Healing Reduction" },
            { imgFileName: "S2_Stat_CooldownRate.png", fieldName: "Cooldown Rate" },
        ],
        [
            { imgFileName: "S2_Stat_Active.png", fieldName: "Active" },
            { imgFileName: "S2_Stat_Passive.png", fieldName: "Passive" },
        ],
    ]

    function MapFilterCategory(filterCategory) {
        return filterCategory.map((filterField, i) => {
            return (
                <div key={i} onClick={(e) => changeFilter(filterField.fieldName)}>
                    <img src={`/StatIcons/${filterField.imgFileName}`} alt={filterField.fieldName + " Stat Image"} />
                    {filterField.fieldName}
                </div>
            );
        })
    }

    return (
        <div className="Item-Filter" style={{ width: 210 }}>
            {
                filterCategories.map((filterCategory, i) => {
                    return (
                        <div key={i}>
                            {
                                i != 0 ? <hr /> : ""
                            }
                            {
                                MapFilterCategory(filterCategory)
                            }
                        </div>
                    );
                })
            }
        </div >
    )
}