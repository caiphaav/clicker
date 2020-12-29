import {Navigation} from 'react-native-navigation';
import React, {useEffect} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Launch, Game} from '@screens';
import {View, StyleSheet, BackHandler} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const onBackPress = () => true;

const RootProvider = gestureHandlerRootHOC((props) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  return <View style={styles.root}>{props.children}</View>;
});

export const registerScreens = () => {
  Navigation.registerComponent(
    'Launch',
    () => (props) => (
      <RootProvider>
        <Launch {...props} />
      </RootProvider>
    ),
    () => Launch,
  );
  Navigation.registerComponent(
    'Game',
    () => (props) => (
      <RootProvider>
        <Game {...props} />
      </RootProvider>
    ),
    () => Game,
  );
};
