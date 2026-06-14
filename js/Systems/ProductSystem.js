import { productTypes } from "../Data/ProductTypes.js";
import { generateProduct } from "../Generators/ProductGenerator.js";
import { world } from "../World/World.js";
import { addHistory } from "./HistorySystem.js";

export function attemptProductCreation(organization) {
	const availableProducts = defineProductTypes(organization);
	const availableProductsKeys = Object.keys(availableProducts);

	const randomProduct = availableProductsKeys[Math.floor(Math.random() * availableProductsKeys.length)];

	const thisProduct = generateProduct(organization, randomProduct);

	organization.products.push(thisProduct);
	world.products.push(thisProduct);

	addHistory(`${organization.name} created product: ${thisProduct.name}`);
}

function defineProductTypes(organiation) {
	return productTypes[organiation.type];
}
