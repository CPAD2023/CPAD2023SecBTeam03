# CPAD2023SecBTeam03
CPAD2023SecBTeam03

# Cook It Up: The Recipe Recommendation Cooking App

## Introduction

Welcome to the Cook It Up: The Recipe Recommendation App! This cross-platform application is designed for users who want to create delicious meals using the ingredients they have on hand. The app leverages the power of Large Language Models (LLMs) and image recognition technology to identify edible ingredients from images provided by the user and then recommends detailed recipes based on these ingredients.

## Features

- **Ingredient Image Recognition**: Users can take a picture of the ingredients they have, and the app will use image recognition to identify edible items while filtering out non-food items like utensils or furniture.

- **Recipe Recommendations**: The app recommends recipes from the internet based on the identified edible ingredients, allowing users to make the most of what they have in their kitchen.

- **Cross-Platform**: Built using React.js, the app is cross-platform, making it accessible to a wide range of users across various devices and operating systems.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software and tools installed:

- Node.js and npm (Node Package Manager)
- React Native development environment (Expo, React Native CLI, etc.)
- Expo Go application installed in your mobile device (https://play.google.com/store/search?q=expo+go&c=apps&hl=en-IN)

### Installation

1. Clone this repository to your local machine.

```bash
git clone <repository-url>
```

2. Change to the project directory.

```bash
cd cook-it-up
```

3. Install project dependencies.

```bash
npm install
```

4. Start the server for front-end at the root location.

```bash
npm start
```

5. Start the backend server in a different terminal.

```bash
cd backend
npm start
```

6. Follow the on-screen instructions to open the app on an emulator or physical device.

## Usage

1. Open Expo Go app in your mobile, and scan the QR Code visible in the front-end terminal. Wait for the bundling to complete. Once done, you are ready to use the app.
  
2. Take a picture of the ingredients you have.

3. The app will use image recognition to identify edible ingredients and filter out non-food items.

4. Once the ingredients are identified, the app will recommend recipes based on the available ingredients.

5. Explore the recipes, view detailed instructions, and start cooking!

## Contributing

We welcome contributions to this project. If you'd like to add new features, fix bugs, or improve the app in any way, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or fix.

3. Make your changes and commit them.

4. Push your branch to your fork.

5. Submit a pull request, and we'll review your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Restrictions

The LLM API that is being used only offers 10 free API calls per day. Kindly keep that in view while using the application.

## Contact

If you have any questions or need assistance, feel free to reach out to us at [2022sp93049@wilp.bits-pilani.ac.in](mailto:2022sp93049@wilp.bits-pilani.ac.in), [2022sp93058@wilp.bits-pilani.ac.in](mailto:2022sp93058@wilp.bits-pilani.ac.in) or [2022sp93059@wilp.bits-pilani.ac.in](mailto:2022sp93059@wilp.bits-pilani.ac.in).

---

Thank you for using the Cook It Up App. We hope you enjoy cooking delicious meals with the ingredients you have on hand. Happy cooking!
