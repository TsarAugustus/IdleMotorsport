import { productTypes } from "../Data/ProductTypes.js";
import Product from "../Models/Product.js";
import { world } from "../World/World.js";

export function generateProduct(organization, product) {
	const thisProduct = new Product();

	thisProduct.id = world.products.length + 1;

	thisProduct.owner = organization;
	thisProduct.type = productTypes[organization.type][product];

	const organizationProductTypesTotal = organization.products.filter((product) => product.type === thisProduct.type).length;

	const productDisplayName = productTypes[organization.type][product].displayName;

	// Temporaty for now
	// TODO: Better automatic naming system. Better technology levels that are relevant to the product (not just technologies.length)
	thisProduct.name = `${productDisplayName} Mk.${organizationProductTypesTotal + 1}`;
	thisProduct.technologyLevel = organization.technologies.length;

	return thisProduct;
}
