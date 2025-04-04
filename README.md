# Native Styled Components

Uma biblioteca de estilização para React Native inspirada no styled-components, permitindo que você escreva estilos reais de CSS em seus componentes.

## Instalação

```bash
npm install native-styled-components
```

## Uso

### Estilização Básica

```jsx
import { styled } from 'native-styled-components';

// Crie um componente View com estilos
const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

// Crie um componente Text com estilos
const StyledText = styled.Text`
  color: #333;
  font-size: 16px;
`;

// Use os componentes em sua aplicação
const App = () => (
  <StyledView>
    <StyledText>Olá, Native Styled Components!</StyledText>
  </StyledView>
);
```

### Estilização Baseada em Props

```jsx
const Button = styled.TouchableOpacity`
  background-color: ${props => props.primary ? '#007AFF' : '#fff'};
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${props => props.primary ? '#fff' : '#007AFF'};
  font-size: 16px;
`;

// Uso
<Button primary>
  <ButtonText primary>Botão Primário</ButtonText>
</Button>
```

### Atributos (.attrs)

```jsx
const ScrollContainer = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
}))`
  flex: 1;
  background-color: #f5f5f5;
`;
```

## Componentes Suportados

Atualmente, suportamos os seguintes componentes do React Native:

- `View`
- `Text`
- `TouchableOpacity`
- `TouchableHighlight`
- `ScrollView`
- `FlatList`
- `Image`
- `ImageBackground`
- `TextInput`
- `Button`
- `Pressable`
- `SafeAreaView`
- `KeyboardAvoidingView`
- `Modal`
- `ActivityIndicator`
- `Switch`
- `RefreshControl`
- `SectionList`
- `VirtualizedList`

## Funcionalidades Implementadas

- ✅ Estilização básica com template literals
- ✅ Suporte a props dinâmicas
- ✅ Atributos (.attrs)
- ✅ Suporte a valores numéricos e strings
- ✅ Conversão automática de kebab-case para camelCase
- ✅ Flatten de estilos automático
- ✅ Suporte a múltiplos componentes React Native
- ✅ TypeScript support

## Limitações Atuais

- ⚠️ Não suporta aninhamento de estilos (nested styles)
- ⚠️ Não suporta keyframes
- ⚠️ Não suporta temas globais
- ⚠️ Não suporta extensão de componentes estilizados
- ⚠️ Não suporta server-side rendering

## Contribuindo

Contribuições são sempre bem-vindas! Por favor, leia nossas diretrizes de contribuição antes de submeter um PR.

## Licença

MIT © [Bruno Henrique Magro]
