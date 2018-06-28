import React from 'react'

export default ({
  prepare = () => {},
  isReady = () => {},
  refreshOnUpdate = [],
  SpinnerComponent
} = {}) => {
  return (LoadedComponent) => {
    return class AdvancedLoaderHOC extends React.Component {
      constructor(props) {
        super(props)
        this.wrappedInstanceRef = React.createRef()
      }

      componentDidMount() {
        if (!isReady(this.props)) {
          prepare(this.props)
        }
      }

      componentDidUpdate(prevProps) {
        if (!refreshOnUpdate.length) {
          return
        }
        const prevVals = refreshOnUpdate.map(p => prevProps[p]).join('|')
        const newVals = refreshOnUpdate.map(p => this.props[p]).join('|')

        if (prevVals !== newVals) {
          prepare(this.props)
        }
      }

      /**
        * Returns the underlying wrapped component instance.
        * Useful if you need to access a method or property of the component
        * passed to react-advanced-loader.
        *
        * @return {object} The rendered React component
        */
      getWrappedInstance () {
        return this.wrappedInstanceRef
      }

      render() {
        if (!isReady(this.props)) {
          return <SpinnerComponent />
        }
        return <LoadedComponent {...this.props} ref={this.wrappedInstanceRef} />
      }
    }
  }
}
