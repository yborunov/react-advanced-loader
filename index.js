import React from 'react'
import * as Spinners from 'better-react-spinkit'

export default ({
  prepare = () => {},
  isReady = () => {},
  refreshOnUpdate = [],
  spinnerType = 'ThreeBounce',
  spinnerOptions = { size: 15 }
} = {}) => {
  return (LoadedComponent) => {

    const SpinnerComponent = Spinners[spinnerType]

    return class AdvancedLoaderHOC extends React.Component {

      componentDidMount() {
        if (!isReady(this.props)) {
          prepare(this.props)
        }
      }

      componentDidUpdate(prevProps) {
        if (!refreshOnUpdate.length) {
          return
        }
        let prevVals = refreshOnUpdate.map(p => prevProps[p]).join('|')
        let newVals = refreshOnUpdate.map(p => this.props[p]).join('|')
        
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
       **/
      getWrappedInstance () {
        return this.refs.wrappedInstance
      }

      render() {
        if (!isReady(this.props)) {
          return <SpinnerComponent {...spinnerOptions} />
        }
        return <LoadedComponent {...this.props} ref="wrappedInstance" />
      }
    }
  }
}
