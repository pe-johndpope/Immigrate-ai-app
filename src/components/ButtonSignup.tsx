import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

const ButtonSignup = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
        { backgroundColor: "#FFFFFF"},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '70%',
    height: '7%',
    borderRadius: 20,
    borderColor: "#493d8a",
    borderWidth: 1,
  },
  text: {
    fontWeight: '700',
    lineHeight: 39,
    fontSize: 20,
    color: '#493d8a',
    fontFamily: "Avenir"
  },
});

export default memo(ButtonSignup);