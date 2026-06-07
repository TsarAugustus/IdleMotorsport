export function Circuit() {
	let xmlns = 'http://www.w3.org/2000/svg';
	let boxWidth = 500;
	let boxHeight = 500;

	let svgElement = document.createElementNS(xmlns, 'svg');
	svgElement.setAttributeNS(null, 'viewBox', '0 0 ' + boxWidth + ' ' + boxHeight);
	svgElement.setAttributeNS(null, 'width', boxWidth);
	svgElement.setAttributeNS(null, 'height', boxHeight);
	svgElement.style['border'] = '1px solid red';
	// svgElement.style.display = 'block';

	let gTag = document.createElementNS(xmlns, 'g');
	svgElement.appendChild(gTag);
	// gTag.setAttributeNS(null, 'transform', 'matrix(1,0,0,-1,0,300)');

	const coords = generateTrackCoordinates(randomNumber(2, 6), boxWidth, boxHeight);

	// let coords = 'M 50 50';
	// coords += ' L 50 200';
	// coords += ' L 200 200';
	// coords += ' L 200 150';
	// coords += ' L 50 150';

	let path = document.createElementNS(xmlns, 'path');
	path.setAttributeNS(null, 'stroke', '#000000');
	path.setAttributeNS(null, 'stroke-width', 5);
	path.setAttributeNS(null, 'stroke-linejoin', 'round');
	path.setAttributeNS(null, 'd', coords);
	path.setAttributeNS(null, 'fill', 'url(#gradient)');
	path.setAttributeNS(null, 'opacity', 1.0);
	gTag.appendChild(path);

	document.body.appendChild(svgElement);
}

function generateTrackCoordinates(iterations, boxWidth, boxHeight) {
	let coords = [];
	for(let i=0; i<iterations; i++) {
		let xCoords = randomNumber(0, boxWidth);
		let yCoords = randomNumber(0, boxHeight);

		
		

		coords.push({x: xCoords, y: yCoords});
	}

	// coords += 'z';

	let coordsToReturn = 'M 50 50';
	coords.forEach(coord => {
		coordsToReturn += ` L ${coord.x} ${coord.y}`;
	});

	coordsToReturn += ' z';

	return coordsToReturn;
}


function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}
