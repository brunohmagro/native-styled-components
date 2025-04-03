import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

// Definição dos tipos para as props do StyledComponent
type StyledComponentProps = {
  style?: ViewStyle | TextStyle;
  children?: React.ReactNode;
};

// Função para criar um componente estilizado
const createStyledComponent = <P extends object>(
  Component: React.ComponentType<P> | React.ElementType // Aceita tanto componentes quanto elementos HTML
) => {
  return (styles: (props: P) => ViewStyle | TextStyle) => {
    const StyledComponent = ({
      style,
      children,
      ...props
    }: StyledComponentProps & P) => {
      // Combina os estilos fornecidos com os estilos gerados pela função `styles`
      const combinedStyles = StyleSheet.flatten([styles(props as P), style]);
      return (
        <Component style={combinedStyles} {...props}>
          {children}
        </Component>
      );
    };

    // Define o displayName para facilitar a depuração
    StyledComponent.displayName = `Styled(${(Component as React.ComponentType).displayName || (Component as any).name || 'Unknown'})`;
    return StyledComponent;
  };
};

// Exporta os componentes estilizados
export const styled = {
  View: createStyledComponent(View),
  Text: createStyledComponent(Text),
  TouchableOpacity: createStyledComponent(TouchableOpacity),
};
