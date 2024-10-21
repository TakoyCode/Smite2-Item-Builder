import './ItemFilter.css'

export default function ItemFilter({ changeFilter }) {
    const filterCategories = [
        [
            { imgName: "S2_Stat_All.png", fieldName: "Clear" },
        ],
        [
            { imgName: "S2_Stat_Strength.png", fieldName: "Strength" },
            { imgName: "S2_Stat_Intelligence.png", fieldName: "Intelligence" },
        ],
        [
            { imgName: "S2_Stat_AttackSpeed.png", fieldName: "Attack Speed" },
            { imgName: "S2_Stat_Lifesteal.png", fieldName: "Lifesteal" },
            { imgName: "S2_Stat_CriticalChance.png", fieldName: "Critical Chance" },
            { imgName: "S2_Stat_Penetration.png", fieldName: "Penetration" },
        ],
        [
            { imgName: "S2_Stat_PhysicalProtection.png", fieldName: "Physical Protection" },
            { imgName: "S2_Stat_MagicalProtection.png", fieldName: "Magical Protection" },
            { imgName: "S2_Stat_MaxHealth.png", fieldName: "Max Health" },
            { imgName: "S2_Stat_HealthRegen.png", fieldName: "Health Regen" },
        ],
        [
            { imgName: "S2_Stat_MaxMana.png", fieldName: "Max Mana" },
            { imgName: "S2_Stat_ManaRegen.png", fieldName: "Mana Regen" },
            { imgName: "S2_Stat_HealingReduction.png", fieldName: "Healing Reduction" },
            { imgName: "S2_Stat_CooldownRate.png", fieldName: "Cooldown Rate" },
        ],
        [
            { imgName: "S2_Stat_Active.png", fieldName: "Active" },
            { imgName: "S2_Stat_Passive.png", fieldName: "Passive" },
        ],
    ]

    return (


        <div className="Item-Filter" style={{ width: 210 }}>
            {/* {
                filterCategories.map((filterField, i) => {
                    return (
                        <div onClick={(e) => changeFilter(filterField.fieldName)}>
                            <img src=".\src\assets\StatIcons\S2_Stat_All.png" alt={filterField.fieldName} />
                            {filterField.fieldName}
                        </div>
                    );

                })
            } */}
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_All.png" alt="" />
                Clear
            </div>
            <hr />
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_Strength.png" alt="" />
                Strength
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_Intelligence.png" alt="" />
                Intelligence
            </div>
            <hr />
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_AttackSpeed.png" alt="" />
                Attack Speed
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_Lifesteal.png" alt="" />
                Lifesteal
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_CriticalChance.png" alt="" />
                Critical Chance
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_MagicalPen.png" alt="" />
                Penetration
            </div>
            <hr />
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_PhysicalProtection.png" alt="" />
                Physical Protection
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_MagicalProtection.png" alt="" />
                Magical Protection
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_MaxHealth.png" alt="" />
                Max Health
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_HealthRegen.png" alt="" />
                Health Regen
            </div>
            <hr />
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_MaxMana.png" alt="" />
                Max Mana
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_ManaRegen.png" alt="" />
                Mana Regen
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_HealingReduction.png" alt="" />
                Healing Reduction
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_CooldownRate.png" alt="" />
                Cooldown Rate
            </div>
            <hr />
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_Active.png" alt="" />
                Active
            </div>
            <div onClick={(e) => changeFilter(e.target.innerText)}>
                <img src=".\src\assets\StatIcons\S2_Stat_Passive.png" alt="" />
                Passive
            </div>
        </div>
    )
}