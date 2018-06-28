# React Advanced Loader v2

React higher-order component that prevents a wrapped component from rendering until specified conditions are met, i.e., an API response is received or some prop is updated.

Compatible with React and React Native projects.

Can be used as a
[higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
(see examples)


## Getting Started

### Installing

```
npm install react-advanced-loader --save
```

### Examples

```javascript
// Using ES7 Decorators
import React, { PropTypes } from 'react'
import AdvancedLoader from 'react-advanced-loader'

import MySpinnerComponent from './MySpinnerComponent'

@AdvancedLoader({
  prepare: (props) => props.loadAPIData(),
  isReady: (props) => props.isLoaded,
  SpinnerComponent: MySpinnerComponent
})
export default class MyComponent extends React.Component {
  static propTypes = {
    loadAPIData: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    SpinnerComponent: PropTypes.instanceOf(React.Component)
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

import MySpinnerComponent from './MySpinnerComponent'

class MyComponent extends React.Component {
  static propTypes = {
    loadAPIData: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    SpinnerComponent: PropTypes.instanceOf(React.Component)
  }

  render() (
    <div>Component loaded!</div>
  )
}

export default AdvancedLoader({
  prepare: (props) => props.loadAPIData(),
  isReady: (props) => props.isLoaded,
  SpinnerComponent: MySpinnerComponent
})(MyComponent) // Enhanced component
```

## API

### AdvancedLoader([prepare],[isReady],[refreshOnUpdate],[SpinnerComponent])(MyComponent)

**Parameters**

-   `prepare` **[[function]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A function that is passed props and contains loading logic that precedes component rendering
-   `isReady` **[[function]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A function that is passed props and returns `true` or `false` depends on specified conditions. Indicates whether a loading process has completed and a component can be displayed.
-   `refreshOnUpdate` **[[array]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** An array that list all props that need to be watched in order to invoke preparation method again
-   `SpinnerComponent` **[[React component]](https://reactjs.org/docs/react-component.html)** Any react component that renders spinner.

### getWrappedInstance()

Returns the underlying wrapped component instance.
Useful if you need to access a method or property of the component
passed to react-advanced-loader. 

Returns **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The wrapped React component instance

## Author

* [George Borunov](https://github.com/yborunov)

## License

This project is licensed under the MIT License.
