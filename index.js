#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('pokemon', {
    alias: 'p',
    type: 'string',
    description: 'Pokemon name to get moves for',
    demandOption: true
  })
  .help()
  .argv;

const printMoves = async (pokemonName) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const pokemon = await response.json();
    const moves = pokemon.moves.map(({ move }) => move.name);
    console.log(`\n🎯 Top 10 moves for ${pokemonName}:`);
    console.log(moves.slice(0, 10).join(',\n '));
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Call the function with the actual pokemon argument
printMoves(argv.pokemon);

