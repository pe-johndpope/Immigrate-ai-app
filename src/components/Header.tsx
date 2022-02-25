import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    color: "#493d8a",
    fontWeight: 'bold',
    paddingBottom: 20,
    marginTop: -40,
  },
});

export default memo(Header);
