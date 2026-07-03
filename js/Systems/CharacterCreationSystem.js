import Person from "../Models/Person.js";
import { world } from "../World/World.js";

export default async function createCharacter() {
	const person = await createCharacterHTMLElement();

	world.people.push(person);

	return person;
}

const formHTML = `
<div id="characterFormContainer">
	<form id="characterForm">

		<label>First Name</label>
		<input type="text" id="firstName">

		<label>Last Name</label>
		<input type="text" id="lastName">

		<label>Age</label>
		<input type="number" id="age">

		<label>Money</label>
		<input type="number" id="money">

		<label>Prestige</label>
		<input type="number" id="prestige">

		<button type="submit">
			Create Character
		</button>

	</form>
</div>
`;

function createCharacterHTMLElement() {
	return new Promise((resolve) => {
		const uiElement = document.getElementById("ui");

		uiElement.insertAdjacentHTML("beforeend", formHTML);

		const form = document.getElementById("characterForm");

		form.addEventListener("submit", (event) => {
			handleCharacterSubmit(event, resolve);
		});
	});
}

function handleCharacterSubmit(event, resolve) {
	event.preventDefault();

	const person = new Person();

	person.id = world.people.length + 1;
	person.firstName = document.getElementById("firstName").value;
	person.lastName = document.getElementById("lastName").value;
	person.age = Number(document.getElementById("age").value);
	person.money = Number(document.getElementById("money").value);
	person.prestige = Number(document.getElementById("prestige").value);

	person.alive = true;
	person.retired = false;

	document.getElementById("characterFormContainer").remove();

	resolve(person);
}
