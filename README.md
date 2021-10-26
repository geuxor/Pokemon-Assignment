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
• User can choose the number of cards available per page (10, 20 and 50)
• User can see previous and next buttons - on both the top and the bottom of the page
• User can search through the list using the name and abilities
• User can sort results by id, name ASC, name DESC, height and weight
• User can refresh the page whilst maintaining sorting, ability and search data
• User can see a details page with all information for each Pokémon
• User can go back to the previous page

# Getting Started

# Frontend
- `cd <dir_name>`
- `npm i`
- `npm start`
- Browser would automatically open pointing to http://localhost:3000/

# Environment Variables
Please add the following lines to your ".env" file located in your Root Folder. If it does not exist it needs to be created.

REACT_APP_POKEMON_API=https://pokeapi.co/api/v2

# Testing 
- `npm run test`
- `a`

# Routes & Architecture Flow
**"Display Orders"**  => /orders     => Orders        => ShopApi \
**"More Details"**    => /orders/:id => OrderDetails  => OrderItem  => OrderLine \
**"Create Order"**    => order/new   => OrderCreate   => ShopApi

## Available Scripts
In the project directory you can run:
#### - "start": "react-scripts start"
Opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### - "build": "react-scripts build"
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

#### - "test": "react-scripts test"
Runs Test files using JEST/Testing Library

#### - "dev": "REACT_APP_API_DOMAIN=development npm start"
Runs the app in the development mode.\
Opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

## NPM packages included
- @ant-design/icons: 4.6.4
- antd: 4.16.13
- axios: 0.21.4
- react: 17.0.2
- react-dom: 17.0.2
- react-router-dom: 5.3.0
- react-scripts: 4.0.3
- react-toastify: 7.0.4

## Dev dependencies included
- @types/react-router-dom: 5.1.9
- @typescript-eslint/eslint-plugin: 4.31.2
- @typescript-eslint/parser: 4.31.2
- eslint: 7.32.0
- eslint-plugin-react: 7.26.0
- typescript: 4.1.2
- @testing-library/jest-dom: 5.11.4
- @testing-library/react: 11.1.0
- @testing-library/user-event: 12.1.10
- @types/jest: 26.0.15
- @types/node: 12.0.0
- @types/react: 17.0.0
- @types/react-dom: 17.0.0


LIMITATIONS

IMPROVEMENTS

INSTALLATION

ARCHITECTURE