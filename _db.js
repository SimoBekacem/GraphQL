export let games = [
	{
		id: '1',
		title: 'The Witcher 3: Wild Hunt',
		platform: ['PC', 'PlayStation', 'Xbox'],
	},
	{
		id: '2',
		title: 'Red Dead Redemption 2',
		platform: ['PlayStation', 'Xbox'],
	},
];
export let reviews = [
	{
		id: '101',
		rating: 5,
		content:
			'The Witcher 3 is an amazing game with rich storytelling and immersive world-building.',
		game_id: '1',
		author_id: '201',
	},
	{
		id: '102',
		rating: 4,
		content:
			'Red Dead Redemption 2 has stunning graphics and a captivating open-world experience.',
		game_id: '2',
		author_id: '202',
	},
];
export let authors = [
	{
		id: '201',
		name: 'John Doe',
		verified: true,
	},
	{
		id: '202',
		name: 'Jane Smith',
		verified: false,
	},
];
