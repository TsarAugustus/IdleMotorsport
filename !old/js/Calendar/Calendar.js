export let Calendar = [];

import { SeriesList } from '../init.js';

export function CreateCalendar() {
	SeriesList.forEach(series => {
		series.Tracks.forEach(track => {
			Calendar.push({ Series: series, Track: track });
		});
	});

	Calendar = Calendar.sort((a, b) => a.Track.date.dateObj - b.Track.date.dateObj);
}
