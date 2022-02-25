# Immigrate.ai 

### Python Development Environment 

The NLP side of the project is managed through Python libraries and packages. To setup set up your Python development environment:
1. Install `poetry` (a virtual environment manager):
   - https://python-poetry.org/docs/#installation 
2. `cd ai`
3. Start `poetry` and install dependencies:
   - `poetry shell`
   - `poetry install`


### Mobile App

The frontend is built using `React Native` and `Expo` and is managed using `yarn`. To setup local development:
1. Install the `expo-cli`:
   - https://docs.expo.dev/workflow/expo-cli/ 
2. Install dependencies: `yarn`
3. Run the project: `expo start`
  
The application itself can be accessed on your mobile device (through `Expo Go`) or on an IOS (iPhone 13, OS 15.2) or Android simulator. To view the project on your
own mobile device, install `Expo Go` and scan the QRCode provided on the metro bundler web page `http://localhost:19002` (assuming you've run `expo start`). To run the project on a simulator, install an android or IOS simulator, open the simulator and, on the metro bundler web page, click "Run on (Android/IOS) simulator" from the options menu.

### Duckling 

Duckling is a tool used by Rasa to transform unstructured data ("the date __today__") into structured data (ex. `{ utc_datetime: 2345432367 }`).

Run the duckling server with: `docker run -p 8000:8000 rasa/duckling`.

### Rasa

Rasa is the primary NLP library driving the chat bot. Rasa relies on the the Rasa server where hooks for processing input data are posted. The Rasa server is run with `rasa run --enable-api --cors "*"` (for the application) or `rasa interactive` (for Rasa testing) and is hosted at `http://localhost:5005`.

### Rasa Actions Server

Rasa actions are custom pieces of code used to draw conclusions (among other things) from data that's been provided by a user. In the context of immigrate.ai, one place where actions are used is to determine the eligability of an immigrate for a given immigration program based on what they've told our chat bot. The action uses their data to compute their _eligability score_ and then tells the user whether or not they are eligable for immigration.

Rasa actions are run on a different server than the main Rasa driver. The Rasa actions server is run with `rasa run actions` and is hosted at `http://localhost:5055`.

