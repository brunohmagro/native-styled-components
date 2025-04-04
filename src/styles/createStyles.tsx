import React from 'react';
import {
  ActivityIndicator,
  Button,
  DrawerLayoutAndroid,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

type StyledComponentProps<T extends object> = {
  style?: ViewStyle | TextStyle;
  children?: React.ReactNode;
} & T;

const parseStaticStyles = (styleString: string): ViewStyle | TextStyle => {
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

const parseStyles = (
  styleString: TemplateStringsArray,
  ...interpolations: Array<
    ViewStyle | TextStyle | ((props: any) => ViewStyle | TextStyle | string)
  >
): ((props: any) => ViewStyle | TextStyle) => {
  return (props: any) => {
    const computedStyles: (ViewStyle | TextStyle)[] = [];

    styleString.forEach((str, index) => {
      // Processa a parte estática da string
      if (str.trim()) {
        const parsed = parseStaticStyles(str);
        computedStyles.push(parsed);
      }

      if (interpolations[index]) {
        const interpolation = interpolations[index];
        const resolved =
          typeof interpolation === 'function'
            ? interpolation(props)
            : interpolation;

        if (typeof resolved === 'string') {
          const lastRule = str.trim().split(';').filter(Boolean).pop();
          if (lastRule) {
            const [property] = lastRule.split(':').map((item) => item.trim());
            const camelCaseProperty = property?.replace(/-([a-z])/g, (g) =>
              String(g[1]).toUpperCase()
            );

            if (typeof camelCaseProperty === 'string') {
              computedStyles.push({ [camelCaseProperty]: resolved });
            }
          }
        } else {
          computedStyles.push(resolved);
        }
      }
    });

    return StyleSheet.flatten(computedStyles);
  };
};

const createStyledComponent = <P extends object>(
  Component: React.ComponentType<P> | React.ElementType
) => {
  return <CustomProps extends object>(
    styles:
      | TemplateStringsArray
      | ((props: P & CustomProps) => ViewStyle | TextStyle),
    ...interpolations: Array<
      | ViewStyle
      | TextStyle
      | ((props: P & CustomProps) => ViewStyle | TextStyle | string)
    >
  ) => {
    const StyledComponent = ({
      style,
      children,
      ...props
    }: StyledComponentProps<P & CustomProps>) => {
      const computedStyles =
        typeof styles === 'function'
          ? styles(props as P & CustomProps)
          : parseStyles(styles, ...interpolations)(props);

      const combinedStyles = StyleSheet.flatten([computedStyles, style]);

      return (
        <Component style={combinedStyles} {...(props as P)}>
          {children}
        </Component>
      );
    };

    StyledComponent.displayName = `Styled(${(Component as React.ComponentType).displayName || (Component as any).name || 'Unknown'})`;
    return StyledComponent;
  };
};

export const styled = {
  ActivityIndicator: createStyledComponent(ActivityIndicator),
  Button: createStyledComponent(Button),
  DrawerLayoutAndroid: createStyledComponent(DrawerLayoutAndroid),
  FlatList: createStyledComponent(FlatList),
  Image: createStyledComponent(Image),
  ImageBackground: createStyledComponent(ImageBackground),
  KeyboardAvoidingView: createStyledComponent(KeyboardAvoidingView),
  Modal: createStyledComponent(Modal),
  Pressable: createStyledComponent(Pressable),
  RefreshControl: createStyledComponent(RefreshControl),
  SafeAreaView: createStyledComponent(SafeAreaView),
  ScrollView: createStyledComponent(ScrollView),
  SectionList: createStyledComponent(SectionList),
  Switch: createStyledComponent(Switch),
  Text: createStyledComponent(Text),
  TextInput: createStyledComponent(TextInput),
  TouchableHighlight: createStyledComponent(TouchableHighlight),
  TouchableOpacity: createStyledComponent(TouchableOpacity),
  View: createStyledComponent(View),
  VirtualizedList: createStyledComponent(VirtualizedList),
};
