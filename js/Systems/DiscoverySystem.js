import { world } from "../World/World.js";

import { technologies } from "../Data/TechnologyDatabase.js";

import { addHistory } from "./HistorySystem.js";

export function attemptDiscoveries() {

    world.people.forEach(person => {

        Object.values(technologies).forEach(tech => {

            if (tech.discovered) return;

            const influenceBonus = getInfluenceBonus(tech.id);

            const discoveryChance = person.skills.aerodynamics + influenceBonus - tech.difficulty;

            const roll = Math.random() * 100;

            if (roll < discoveryChance) {

                tech.discovered = true;

                tech.discoveredBy = person.id;

                tech.discoveredYear = world.year;

                addHistory(`${person.firstName} ${person.lastName} discovered ${tech.name} in year ${world.year}.`);
            }
        });
    });
}

function getInfluenceBonus(technologyId) {

    let bonus = 0;

    Object.values(technologies).forEach(tech => {

        if (!tech.discovered) return;

        if (tech.influences[technologyId]) {
            bonus += tech.influences[technologyId];
        }

    });

    return bonus;
}
