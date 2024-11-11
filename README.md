# Reach Industries Frontend Assessment

## The Application

### Local Execution

The application can be run locally by cloning the repo and from the application folder running the following:

```bash
$ npm install
$ npm run dev
```

The application will open in a browser window at address `http://localhost:5173`.

To build the application issue the following command:

```bash
$ npm run build
```

The built application will be found in the `dist` folder.

### Online

A version of the application can be found running at `https://lab-monitor-test.netlify.app.`

### Dockerised Application

A `Dockerfile` is available to build the image and run the container for the application. Issue the following commands from the application folder:

```bash
$ docker build -t lab-monitor .
$ docker run -p 80:80 lab-monitor
```

The application is available in a web browser at `http://localhost`.

Alternatively, Docker Compose making use of `docker-compose.yml` can be run with the command:

```bash
$ docker-compose up
```

Again, the application will be available in a web browser at `http://localhost`.

## Tech Stack

Along with React and TypeScript, the other following libraries were used:

- Chakra UI
- React Icons

Vite was used to setup the application.


## Outline of Development

### Layout and Components

The first consideration for building the application was defining its layout and separation into components plus considering what responsibilities those components would take.
  
  - The root `App` component would pass the necessary context providers, namely that for Chakra UI and be parent to a `Layout` component.
  - The `Layout` component takes on the responsibility of the content layout using a CSS grid and also deals with the responsiveness of the application. For simplicity, only three media query breakpoints were considered, defined by Chakra UI: `base`, `sm` and `md`. Using Chakra UI's API the necessary code was added to ensure the layout grid would fit within the window and the menu would switch between being part of the grid to being a popout menu when switching `md` and `base`/`sm` breakpoints. I made use of components provided by Chakra UI to speed up development, but acknowledge that the layout with a bit more time and effort could be coded more simply and elegantly.
  - There were four major parts of the application to build: the header, menu, video player (with the annotations data) and the comments. Since the header and menu seemed naturally to be a part of the layout I placed them in the 'Layout' folder. Components for the video and comments parts of the application were placed into their own folder.

### Header

The 'Header' part of the application is a straighforward container for the application title. It also houses the button for calling into view the popout menu on smaller (`base`/`sm` breakpoint) screens.

### Menu

The 'Menu' part of the application is a list of links (and they are dummy links as per the assessment requirements). It can be reused between the desktop and mobile versions of the layout.

### Video

The 'Video' part of the application is comprised of a number of components.

  - The `VideoContainer` component acts to make a call to the business logic of fetching the video annotations while also providing the layout for the video player and the raw annotations JSON data feature. The annotations fetch has been encapsulated in a custom hook `useGetAnnotations` and provides not only the data but loading and error states. I used the Fetch API for the API call.
  - The `VideoPlayer` component receives the fetched data on annotations via its props. It needs to reference the DOM elements of the HTML5 video (`<video></video>`) and a canvas (`<canvas></canvas>`). The latter is overlaid on the video and is the surface upon which the rectangles defined by the annotations data are drawn.
  - The `VideoPlayer` component renders and the refs are assigned. An effect is run (and only on mount) to check for the video and canvas refs' presence. The canvas dimensions are set in state based on the dimensions the video takes when the latter has rendered. The reason for setting canvas dimensions in state is to trigger a re-render so that the canvas is the right size for the calculations performed in the `drawRectangles` function. This proved to be a challenge to solve as the canvas was not always ready with the right dimensions to correlate with the video size and this could result in rectangles being wrongly positioned and of the wrong sizes.
  - The `drawRectangles` function makes use of a utility function called `calculateRectangle`, separated from the component code so as to aid in its testing.
  - A further effect is run which adds the necessary event listeners, namely one to detect changes in the playback time/position of the video and thus run the `handleTimeUpdate` callback, and one to detect window resize changes which runs the `handleResize` callback. The event listeners are removed via the cleanup `return` function of `useEffect`.
  - The `handleTimeUpdate` callback updates state for the current video position required by the video scrub slider and the display of the current frame as well as running the `drawRectangles` function.
  - The `handleResize` callback updates the canvas dimensions in state with window resize and redraws any existing rectangles based on the new dimensions.
  - The above callbacks are memoised with `useCallback` to avoid unnecessary re-renders of the `useEffect` they are called upon via the event listeners. `drawRectangles` also has to be memoised.
  - Event handlers are provided for the video playback button and the scrub slider which have been encapsulated in a child `VideoControls` component. Custom controls were created instead of using the video's own inherent controls because the overlaid canvas obstructs access to the inherent controls. Also custom controls provide for more flexible setup. Again, much use was made of Chakra UI components to lay out the interface.
  - The current video frame and associated annotation data are displayed. The current video frame is found within the `VideoControls` component as it naturally couples with the playback and slider controls. A 'Raw JSON Data' button, encapsulated in its own `Annotations` child component, opens a modal where the JSON data is displayed and a button is available for JSON download. A `downloadFile` utility is called for this purpose. This utility creates a blob from the stringified JSON with the correct file type. A hyperlink, invisible to users, is created which acts as the download link for the blob accessed via the `window.URL.createObjectURL` method and is programmatically clicked to 'download' JSON as a file to the user's computer. To avoid memory leaks `window.URL.revokeObjectURL` is called and the hyperlink removed from the DOM.

### Comments

The 'Comments' part of the application displays mock comments delivered via websocket.
  
  - The `Comments` component calls a custom hook `useGetComments` which is responsible for the websocket setup and call as well as delivery of the comments. Since each comment is missing a unique ID and timestamp, these are added to each new comment received. The unique ID, which persists for the associated comment and is never re-generated per comment is required for the `key` attribute on the `Comment` child component.
  - The `Comments` component has the job of iterating over and displaying the list of comments. A reference is made to the div which houses the comments using `useRef` to auto-scroll the list to the bottom each time a new comment is received so as to keep the latest comment in view. A custom hook `useScrollTo` was employed to encapsulate the logic here. An attempt was made to cause auto-scrolling to be paused while a user manually scrolls the div and allow for its re-enabling by means of a button. The challenge was distinguishing between scrolls caused automatically and those by the user. With a bit more time and effort this is something that could be looked at to improve the UX for this feature.
  - The `Comment` component is straightforward and is parent to an `Avatar` component as well as the comment data, namely the author, timestamp and message.

### Other

- Prettier was used to enforce consistent code style using its defaults.
- ESLint was used for lint checking.
- Vitest and React Testing Library have been used for tests.

## Challenges, Constraints and Considerations

In addition to some of the challenges faced as described in earlier sections I list the following:

- A more streamlined approach to the layout, more work on the responsiveness and spacing in the layout. More effort on moving styles out from inline locations in code. For Chakra UI this could mean further adding styles to apply globally and to components via the `extendTheme` function as seen in `App.tsx`. Other alternatives include using other CSS approaches (e.g., Tailwind) and/or other comopnent libraries.

- More work needs to be done to refine the responsiveness of the application including better sizing of components especially between portrait and landscape oriented screens.

- Another responsiveness issue needing dealing with is the interruption to the application's interface by tab and and other bars shown by mobile browsers such as Safari and Chrome that often overlay on the comments stream for instance necessitating a scroll of the application page to see at least the bottom of the comments stream.

- Accessibility could also be worked on further investigating better colour contrast between individual elements (and more effort looking at better styling the various controls), addition of screen reader friendly information, although an attempt was made to apply `aria-label` to many controls). Use of semantic HTML tags (e.g., `<section>`, `<main>`, `<aside>`, etc.) to aid in the use of assistive technologies. Font sizes could be better defined for accessibility. Devtools such as axe could be used to check how well the application meets web accessibility standards including WCAG.

- There needs to be work done to deal with the situation where the screen is switched from mobile to desktop and the popup menu is open - ideally it should close on entering a desktop screen size, but resumes its open state on switching back to mobile.

- There were challenges to get the video to playback on mobile devices due to restrictions imposed by certain browsers on whether they should be muted, can be auto-played, etc. I ensured the video was set with `playsInline`, `muted` attributes and no `autoPlay` attribute.

- A number of tests have been written for various components and hooks. Due to time constraints more coverage is required on the `VideoPlayer` component although a challenge exists to mock the video player and spy on its various functions to test the event handlers for the player. Some testing can be achieved by separating the controls code into the child `VideoControls` component. More challenges exist in mocking various other elements for tests, and to avoid testing implementation details and third party code. Tests also need writing for a few other mainly layout-based components. Other considerations could include end-to-end testing, using e.g., Cypress.

- With more time and effort the application could be optimised for performance including looking at the final build bundle sizes to see if they can be reduced. Options for optimisation include using streamlined libraries or parts of as necessary, lazy loading.

## Resources

The main resources used where further information was required to aid in building this application are as follows:

- Official documentation of React and the various other libraries used
- Forums, e.g., Stack Overflow (although care was taken assessing the quality and accuracy of information available here wherever possible).

## UPDATE

- The interface fits onto one screen without scrolling on a large enough desktop screen or in a mobile device in portrait mode. To deal with other screen sizes outside these the folloiwing approaches can be taken:
    - Currently, the styling prioritises the video's size and its height especially on landscape screens pushing the comments stream out of view and/or is clipped itself. In the immediate term for desktop if given time I would have the video resize its height while maintining aspect ratio with its width, plus centering the video, as one reduced the window height size so as to move the comments stream up and prevent a window scroll.
    - Separate styles for landscape vs portrait, possibly adjusting the video size more responsively to accommodate the comments stream.
    - A change in the layout of the various parts of the interface between portrait and landscape, either different positions of the various elements (e.g. comments stream moved to the side vs the bottom). Or using other layout techniques to accommodate different content such as a modal/popup/accordion/tabs where appropriate.
    - To deal with the problem of mobile browsers overlying bars like tab/navigation bars on the interface, various options include:
      - Using `100%` instead of `100vh` heights if possible
      - Fixing the comments stream to the bottom of the window with `position:fixed` but need to adjust the video player's size responsively.
      - Using newer units such as `dvh`, `svh` if target web browsers support these. These units can return heights for the available viewport size accounting for overlaid browser bars.
      - Using some calculation to deduct from `100vh` to help return a height that accommodates the mobile browser bars.
      - I am aware on forums of various approaches developers have taken including the above, some working under certain scenarios (e.g., certain mobile platforms/devices), others not.
