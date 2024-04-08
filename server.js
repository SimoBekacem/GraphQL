import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import { games, reviews, authors } from './_db.js';

const PORT = process.env.PORT || 4000;

const resolvers = {
	Query: {
		games() {
			return games;
		},
		game(_, args) {
			return games.find((game) => game.id === args.id);
		},
		reviews() {
			return reviews;
		},
		review(_, args) {
			return reviews.find((review) => review.id === args.id);
		},
		authors() {
			return authors;
		},
		author(_, args) {
			return authors.find((author) => author.id === args.id);
		},
	},
	Game: {
		reviews(parent) {
			return reviews.filter((r) => r.game_id === parent.id);
		},
	},
	Author: {
		reviews(parent) {
			return reviews.filter((r) => r.author_id === parent.id);
		},
	},
	Review: {
		game(parent) {
			return games.find((g) => g.id === parent.game_id);
		},
		author(parent) {
			return authors.find((a) => a.id === parent.author_id);
		},
	},
	Mutation: {
		deleteGame(_, args) {
			const deletedGameIndex = games.findIndex(
				(game) => game.id === args.id
			);
			if (deletedGameIndex === -1) {
				throw new Error('Game not found');
			}
			const deletedGame = games[deletedGameIndex];
			games.splice(deletedGameIndex, 1);
			return deletedGame;
		},
		addGame(_, args) {
			const addedGame = {
				...args.game,
				id: Math.floor(Math.random() * 10000),
			};
			games.push(addedGame);
			return addedGame;
		},
		updateGame(_, args) {
			const gameIndex = games.findIndex((g) => g.id === args.id);
			if (gameIndex === -1) {
				throw new Error('Game not found');
			}

			const updatedGame = {
				...games[gameIndex],
				...args.update,
			};

			games[gameIndex] = updatedGame;

			return updatedGame;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);
