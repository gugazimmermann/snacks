import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import NotificationTwitt from './NotificationTwitt';
import { notificationTweets } from '../utils/data';

function renderItem({ item }) {
  return <NotificationTwitt {...item} />;
}

function keyExtractor(item) {
  return item.id.toString();
}

const AllNotifications = () => {
  const theme = useTheme();

  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      style={{ backgroundColor: theme.colors.background }}
      data={notificationTweets}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <View style={{ height: StyleSheet.hairlineWidth }} />
      )}
    />
  );
};

export default AllNotifications;
