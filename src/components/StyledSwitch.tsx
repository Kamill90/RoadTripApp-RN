import React from 'react';
import { Switch } from 'react-native';

import { palette } from 'styles';

interface Props {
  onValueChange?: (value: boolean) => void;
  value?: boolean;
}

const trackColor = {
  false: palette.lightGrey,
  true: palette.primary,
};

export const StyledSwitch = ({ onValueChange, value }: Props) => (
  <Switch
    thumbColor={palette.white}
    ios_backgroundColor={palette.lightGrey}
    trackColor={trackColor}
    value={value}
    onValueChange={onValueChange}
  />
);
