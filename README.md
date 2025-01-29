# React Snake Game

A classic Snake game implementation built with React.js. Move the snake using arrow keys, collect food to grow, and avoid collisions with walls and yourself!

[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

![Gameplay Screenshot](/public/screenshot.png) <!-- Add screenshot later -->

## Features

- Classic snake game mechanics
- Responsive grid-based gameplay
- Score tracking system
- Collision detection (walls & self-collision)
- Game over screen with restart functionality
- Smooth keyboard controls
- Modern UI with clean animations
- 20x20 game grid

## Installation

1. Clone the repository:
```bash
git clone https://github.com/majortank/snake.git
```

2. Install dependencies:
```bash
cd snake-game
npm install
```

3. Start the development server:
```bash
npm start
```

## How to Play

- Use arrow keys (↑ ↓ ← →) to control the snake's direction
- Collect red food dots to grow and increase your score
- Avoid hitting walls or the snake's own body
- Game ends on collision, click "Play Again" to restart

## Technologies Used

- React 18
- Functional Components & Hooks
- CSS Flexbox & Grid
- HTML5 Canvas (conceptual)
- JavaScript ES6+

## Project Structure

```
├── public
├── src
│   ├── App.css       # Main styles
│   ├── App.js        # Game logic & components
│   ├── index.js      # Root component
│   └── ...
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- React documentation
- Create React App boilerplate
- Classic Snake game mechanics
