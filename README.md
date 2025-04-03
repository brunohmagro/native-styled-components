# My Styled Components Replacement

Uma biblioteca para estilização de componentes no React Native, inspirada no `styled-components`. Permite a criação de componentes estilizados de forma modular e reutilizável.

## Instalação

Para instalar a biblioteca, use o npm ou yarn:

```bash
npm install native-styled-components
```

ou

```bash
yarn add native-styled-components
```

## Uso

### Importação

Importe os componentes e o `ThemeProvider` da biblioteca:

```javascript
import { styled, ThemeProvider, defaultTheme } from 'native-styled-components';
```

### Criando Componentes Estilizados

Você pode criar componentes estilizados usando a função `styled`:

```javascript
const StyledView = styled.View((props) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.theme.colors.background,
}));

const StyledText = styled.Text((props) => ({
  color: props.theme.colors.text,
  fontSize: 16,
}));
```

### Usando o ThemeProvider

Para aplicar um tema, envolva seus componentes com o `ThemeProvider`:

```javascript
const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <StyledView>
      <StyledText>Olá, mundo!</StyledText>
    </StyledView>
  </ThemeProvider>
);
```

## Temas

Você pode definir temas personalizados e usar o tema padrão fornecido:

```javascript
export const defaultTheme = {
  colors: {
    background: '#f0f0f0',
    primary: '#6200ee',
    text: '#000',
  },
};
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
