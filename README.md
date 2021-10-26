# Introduction
A  web application to list all Pokémon and show paginated results from the [PokeAPI v2](https://pokeapi.co/docs/v2). Pokémons are shown in a card-based layout containing the image of the Pokémon as well as the following:
  o Name
  o Height
  o Weight
  o List of abilities

This app is accompanied by unit tests


# Technology used
- React.js
- Testing-library
- CSS


# Functionality
• User can choose the number of cards available per page (10, 20 and 50)\
• User can see previous and next buttons - on both the top and the bottom of the page\
• User can search through the list using the name and abilities\
• User can sort results by id, name ASC, name DESC, height and weight\
• User can refresh the page whilst maintaining sorting, ability and search data\
• User can see a details page with all information for each Pokémon\
• User can go back to the previous page\


# Getting Started
## Environment Variables
Please add the following lines to your ".env" file located in your Root Folder. If it does not exist it needs to be created.

>REACT_APP_POKEMON_API=https://pokeapi.co/api/v2

## Running the Frontend
- `cd <dir_name>`
- `npm i`
- `npm start`
- Browser would automatically open pointing to http://localhost:3000/

## Testing the App
- `npm run test`
- `a`


# Available Scripts
In the project directory you can run:
#### - `start: react-scripts start`
Opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### - `test: react-scripts test`
Runs Test files using JEST/Testing Library

# Routes & Architecture Flow
**Display Pokemons "/"** => App => BrowserRouter => Router => PokemonPage => PokemonList\
**Pagination**<span style="padding-left: 424px;"> => Pagination</span><br/>
**Sorting**<span style="padding-left: 445px;"> => Sort</span><br/>
**Searching**<span style="padding-left: 430px;"> => Search</span><br/>
**More Details** "/pokemon/:id" => PokemonDetails\


# Dev dependencies included
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/jest 
- @types/node
- @types/react
- @types/react-dom
- antd 
- axios
- react
- react-dom
- react-router-dom
- react-scripts


# Limitations
- When sorting by ability you must re-select "all" before being able to sort by name/id/height/weight 
- When sorting by name/id/height/weight you must re-select "-" before being able to sort by ability
- GraphQL would have allowed caching of all items without the need to create customized object
- A styling framework would have provided better consistency across the design of elements and better UX design
- Too many renders are occurring due to the amount of State Hooks
- Loading time and efficiency could be improved through code optimization
- Cleaner code for PokemonPage would have allowed easier debugging and better separation of concerns
- No keyboard navigation
- No Linter configuration
- To clear Search input field the close-circle that appears at input must be pressed 