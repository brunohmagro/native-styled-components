import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

// Definição dos tipos para as props do StyledComponent
type StyledComponentProps = {
  style?: ViewStyle | TextStyle;
  children?: React.ReactNode;
};

const parseStyles = (styleString: string): ViewStyle | TextStyle => {
  const styles: { [key: string]: string | number } = {};
  const rules = styleString.split(';');

  rules.forEach((rule) => {
    const [property, value] = rule.split(':').map((item) => item.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
        String(g[1]).toUpperCase()
      );

      const numericValue = parseFloat(value);
      styles[camelCaseProperty] = isNaN(numericValue) ? value : numericValue;
    }
  });

  return styles;
};
const createStyledComponent = <P extends object>(
  Component: React.ComponentType<P> | React.ElementType
) => {
  return (
    styles: TemplateStringsArray | ((props: P) => ViewStyle | TextStyle)
  ) => {
    const StyledComponent = ({
      style,
      children,
      ...props
    }: StyledComponentProps & P) => {
      const computedStyles =
        typeof styles === 'function' ? styles(props as P) : styles;

      const processedStyles = Array.isArray(computedStyles)
        ? parseStyles(computedStyles.join(''))
        : computedStyles;

      const isObject = (
        styleObject: any
      ): styleObject is ViewStyle | TextStyle => {
        return (
          styleObject &&
          typeof styleObject === 'object' &&
          !Array.isArray(styleObject) &&
          styleObject !== null
        );
      };

      const combinedStyles = StyleSheet.flatten([
        isObject(processedStyles) ? processedStyles : {},
        style || {},
      ]);

      return (
        <Component style={combinedStyles} {...props}>
          {children}
        </Component>
      );
    };

    StyledComponent.displayName = `Styled(${(Component as React.ComponentType).displayName || (Component as any).name || 'Unknown'})`;
    return StyledComponent;
  };
};

export const styled = {
  View: createStyledComponent(View),
  Text: createStyledComponent(Text),
  TouchableOpacity: createStyledComponent(TouchableOpacity),
};
