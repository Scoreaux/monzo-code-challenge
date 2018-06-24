# monzo-code-challenge

### Getting started
1. Clone the repository
1. Install dependencies:  
`npm install`

### Running the code
The code can be executed in two ways:
- **Webpack dev server:**  
`npm run dev`, then navigate to [http://localhost:9000](http://localhost:9000)
- **Compiled**  
`npm run prod`, then open the file `/dist/index.html` in the cloned repo directory

### Tests
Tests are run before compiling the code, but can be run manually with the command `npm run test`, or `npm run test:coverage` to see test coverage.

### Thoughts and future changes
- I built this as if it were a prototype of an app that is to be tested internally, so I've only implemented some security features (such as forcing router redirects when an API request fails due to an invalid/expired token). Before this app could be used in a production environment, I would implement code splitting to prevent any protected logic being available when not authenticated and ensure any npm packages used didn't have any security vulnerabilities.
- I chose not to use Redux since there is only a single top level view when signed in (the apps list) and very few actions. However, given the scope/feature set of this app could increase over time, I've written API methods and related state changes in such a way that they could be easily turned into actions and reducers with minimal refactoring.
- I've included unit tests for each component, but would write integration tests as more components are added and the number of interactions between them increases.
- I didn't have the time to add a loading UI and error message when editing an app's details. The fields currently display their original value until a successful response is returned from the server.
- On the back end, I would improve the user list pagination by including a total count value so that the total number of pages could be displayed in the UI (allowing users to skip multiple pages at once safely, or skip to the end of the list, not possible using the current API).
- The app in this prototype phase meets the functional requirements, however it's missing small details I like to include that can make a UI feel 'magical' 🎩, such as small, clean transitions on interactive elements, and more personable language (for example, We don't know the user's name as the API doesn't currently support it, but displaying 'Hi, Dylan' after signing in can make the app feel more friendly).
- I originally persisted the access token using the localStorage browser API, but removed this as it causes security errors when running the app locally. In production, I would add persistence of the access token and username so that when signing in again, only the password field would need to be presented to the user, improving ease of use.
