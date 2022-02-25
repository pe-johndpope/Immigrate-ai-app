import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
        { backgroundColor: "#493d8a"},
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
    marginVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 39,
    color: '#FFFFFF',
    fontFamily: "Avenir"
  },
});

export default memo(Button);