# Expo Tailwind Bolierplate

Raact Native project with Expo and NativeWind, tailwind css library for React Native.
For web development i preset webpack config for include nativewind into web build.

# Development run

- ``` npm install ```
- ``` npx expo start --web ```: Browser run
- ``` npx expo start --ios ```: Macos users for Ios simulator (XCode required)
- ``` npx expo start --android ```: Windows/Macos users for Android (Android studio required)
- ``` npx expo start --tunnel ```: Windows with Iphones App (Expo Go)

# Documentation links

- [Expo Docs](https://docs.expo.dev/)

## Folder Structure
In this template i show you my personal feature project structure that i used for all my business projects.

- ``` assets ```: folder contains adaptive-icon.png used for Android and an icon.png used for iOS as an app icon. It also contains splash.png which is an image for the project's splash screen and a favicon.png if the app runs in a browser.
- ``` src/images ```: folder where you will keep all global application images.
- ``` src/types ```: folder where you will define global types for your application. This includes module types, interface definitions, and any other custom types you need to use throughout the application.
- ``` src/libs ```: folder where you can keep any application-specific files that are used globally throughout the app. This can include the axios instance for making API calls, error handling services, constants, setting up query client in react-query etc.
- ``` src/components ```: folder where you will keep all of your reusable components. These components should be isolated and not specific to any particular feature or domain. Examples of these types of components include headers, buttons, and list items.
- ``` src/hooks ```: folder where you will keep any custom hooks that are used throughout your application. A hook is a special type of function in React that allows you to reuse stateful logic across your components.
- ``` src/localizations ```: folder where you will keep all of the files related to internationalization in your application. This includes language files, string constants, and any other resources needed to support multiple languages in your application.
- ``` src/navigation ```: folder where you will keep all of the code related to navigation in your application. This includes the stacks, types, routes, and any other components or functions needed to support navigation.
- ``` src/services ```: folder where you will keep all of the code related to the underlying infrastructure of your application. This includes code for working with push notifications, error monitoring, and any other services that are used to provide the underlying functionality of your application.
- ``` src/theme ```: folder where you should store your app's styling, for example dark/light theme. Keeping your styling and theme files in one place makes it easier to manage and update your app's look and feel as needed.
- ``` src/utils ```: folder where utility functions can be an important part of your React Native application, as they provide a way to reuse code that can be used in multiple parts of your application. The utils folder in your application is a great place to store utility functions that are used throughout your application.
- ``` src/features ```: Having a features folder helps to achieve this as it separates all the different features of the application into distinct categories. This allows developers to quickly find and make changes to a specific feature without affecting other parts of the application.

### Example feature structure

- ``` src/features/name-feature/api ```: folder contains all the API-related code specific feature.
- ``` src/features/name-feature/helpers ```: folder contains helper methods or utility functions that are specific to the feature. They can be used exclusively within the feature and do not need to be shared with other parts of the application.
- ``` src/features/name-feature/hooks ```: folder contains hooks that are related specifically to the feature. Since React is heavily dependent on hooks, this makes it easier to manage the hooks and keep them organized.
- ``` src/features/name-feature/screens ```: folder contains all the screens for the feature. Example auth feature, this includes the login screen, sign-up screen, and forgotten password screen, among others.
- ``` src/features/name-feature/services ```: folder contains services that are specific to the feature. For example, you might have an authentication service that is responsible for handling user logins and sign-ups.
- ``` src/features/name-feature/store ```: folder contains the state management code specific to the feature. This can be a Redux store, a Zustand store, or any other state management library you prefer.

