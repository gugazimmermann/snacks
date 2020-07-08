/* eslint-disable no-shadow */
import React, { useState } from 'react';
import color from 'color';
import { Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import overlay from '../utils/overlay';
import Feed from './Feed';
import AllNotifications from './AllNotifications';

const Notifications = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'mentions', title: 'Mentions' },
  ]);

  const theme = useTheme();

  const initialLayout = { width: Dimensions.get('window').width };

  const All = () => <AllNotifications />;

  const Mentions = () => <Feed {...props} />;

  const renderScene = SceneMap({
    all: All,
    mentions: Mentions,
  });

  const tabBarColor = theme.dark
    ? overlay(4, theme.colors.surface)
    : theme.colors.surface;

  const rippleColor = theme.dark
    ? color(tabBarColor).lighten(0.5)
    : color(tabBarColor).darken(0.2);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: tabBarColor, shadowColor: theme.colors.text }}
      labelStyle={{ color: theme.colors.primary }}
      pressColor={rippleColor}
    />
  );

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

export default Notifications;
