import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import Twitt from '../components/Twitt';
import { statement } from '../utils/data';

function renderItem({ item }) {
  return <Twitt {...item} />;
}

function keyExtractor(item) {
  return item.id.toString();
}

const Statement = ({ navigation }) => {
  const theme = useTheme();

  const data = statement.map((twittProps) => ({
    ...twittProps,
    onPress: () => navigation && navigation.push('Details', { ...twittProps }),
  }));

  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      style={{ backgroundColor: theme.colors.background }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <View style={{ height: StyleSheet.hairlineWidth }} />
      )}
    />
  );
};

export default Statement;
