# React Advanced Loader

React higher-order component that prevents a wrapped component from rendering until specified conditions are met, i.e., an API response is received or some prop is updated.
Displays selected animated spinner from [better-react-spinkit](https://github.com/bentatum/better-react-spinkit) collection while loading.

Can be used as a
[higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
(see examples)


## Getting Started

### Installing

```
npm install react-advanced-loader--save-dev
```

### Examples

```javascript
// Using ES7 Decorators
import React, { PropTypes } from 'react'
import AdvancedLoader from 'react-advanced-loader'

@AdvancedLoader({
  prepare: (props) => props.loadAPIData(),
  isReady: (props) => props.isLoaded
})
export default class MyComponent extends React.Component {
  static propTypes = {
    loadAPIData: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired
  }

  render() (
    <div>Component loaded!</div>
  )
}
```

```javascript
// ES2015
import React, { PropTypes } from 'react'
import AdvancedLoader from 'react-advanced-loader'

class MyComponent extends React.Component {
  static propTypes = {
    loadAPIData: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired
  }

  render() (
    <div>Component loaded!</div>
  )
}

export default AdvancedLoader({
  prepare: (props) => props.loadAPIData(),
  isReady: (props) => props.isLoaded
})(MyComponent) // Enhanced component
```

## API

### AdvancedLoader([prepare],[isReady],[refreshOnUpdate],[spinnerType],[spinnerOptions])(MyComponent)

**Parameters**

-   `prepare` **[[function]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A function that is passed props and contains loading logic that precedes component rendering
-   `isReady` **[[function]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A function that is passed props and returns `true` or `false` depends on specified conditions. Indicates whether a loading process has completed and a component can be displayed.
-   `refreshOnUpdate` **[[array]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An array that list all props that need to be watched in order to invoke preparation method again
-   `spinnerType` **[[string]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** A string that indicates which spinner from [better-react-spinkit](http://better-react-spinkit.benjamintatum.com/) should be used. Defaults to `ThreeBounce`.
-   `spinnerOptions` **[[object]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Full list of available options for specific spinner type can be found in [here](http://better-react-spinkit.benjamintatum.com/).
  -   `spinnerOptions.color` **[[string]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** A string that indicates what spinner color should be 
  -   `spinnerOptions.size` **[[number]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** A number that set a size of the spinner, on a scale of 1 to 100. Defaults to `15`.

### getWrappedInstance()

Returns the underlying wrapped component instance.
Useful if you need to access a method or property of the component
passed to react-advanced-loader. 

Returns **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The wrapped React component instance

## Author

* [George Borunov](https://github.com/yborunov)

## License

This project is licensed under the MIT License.
