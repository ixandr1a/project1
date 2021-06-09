import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Camera from './components/Camera';
import Home from './components/Home';
export default function App() {
  const [text, setText] = React.useState('')

  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/camera" component={Camera} />
        </Switch>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // loginWrapper: {
  //   marginTop: 160
  // },
  // inputLoginBtn: {
  //   backgroundColor: '#9999CC',
  //   color: '#fff',
  //   width: 160,
  //   paddingVertical: 15,
  //   borderRadius: 100,
  //   alignSelf: 'center',
  //   marginTop: 12,
  //   marginBottom: 12
  // },
  // inputLogin: {
  //   backgroundColor: '#fff',
  //   marginTop: 12,
  //   width: 290,
  //   fontSize: 20,
  //   paddingHorizontal: 14,
  //   alignSelf: 'center'
  // },
  // loginWrapperTitle: {
  //   marginBottom: 23,
  //   textAlign: 'center',
  //   fontSize: 35
  // },
  // logo: {
  //   width: 415,
  //   marginTop: 20
  // },
  // header: {
  //   height: 140,
  //   backgroundColor: '#fff',
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: .1,
  //   shadowRadius: 17,
  // }
});
