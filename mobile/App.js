import React from 'react';
import {YellowBox} from 'react-native'
import Routes from './src/routes'



export default props => {

  YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection'
  ])

  return(
    <Routes />
  )
}
  
