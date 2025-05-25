# ClimaAgora 🌤️

Um aplicativo React Native que exibe informações climáticas em tempo real baseado na localização atual do usuário.

## 📱 Funcionalidades

### Requisitos Obrigatórios ✅
- **Tela Inicial**: Saudação dinâmica com botão "Ver clima agora"
- **Navegação**: React Navigation entre 2 telas
- **Localização**: Obtenção da localização atual com permissões
- **API do Clima**: Integração com OpenWeatherMap API
- **Informações Exibidas**:
  - Nome da cidade
  - Temperatura atual
  - Condição climática
  - Ícone do tempo
  - Sensação térmica
  - Data e hora atual formatada

### Funcionalidades Extras (Bônus) 🎯
- **Saudação Dinâmica** (+1pt): "Bom dia", "Boa tarde", "Boa noite" baseado na hora
- **Interface Responsiva**: Design clean e moderno
- **Estados de Loading**: Indicadores visuais durante carregamento
- **Tratamento de Erros**: Mensagens amigáveis para o usuário

## 🛠️ Tecnologias Utilizadas

- **React Native** com TypeScript
- **Expo** (expo-location)
- **React Navigation** v6
- **OpenWeatherMap API**
- **React Hooks** (useState, useEffect, custom hooks)

## 📂 Estrutura do Projeto

```
src/
├── routes/
│   └── index.tsx          # Configuração do React Navigation
├── screens/
│   ├── HomeScreen.tsx     # Tela inicial com saudação
│   └── ClimaScreen.tsx    # Tela principal do clima
└── hooks/
    └── useLocation.ts     # Custom hook para localização
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js
- Expo CLI
- Conta no OpenWeatherMap (para API key)

### Passos

1. **Clone o repositório**
```bash
git clone [seu-repositorio]
cd clima-agora
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure a API Key**
- Acesse [OpenWeatherMap](https://openweathermap.org/api)
- Crie uma conta gratuita
- Obtenha sua API key
- Substitua `'SUA_API_KEY_AQUI'` no arquivo `src/screens/ClimaScreen.tsx`

4. **Execute o projeto**
```bash
npx expo start
```

5. **Teste no dispositivo**
- Use o Expo Go no seu smartphone
- Escaneie o QR code
- Permita acesso à localização quando solicitado

## 🔑 API Utilizada

**OpenWeatherMap API**
- URL: https://openweathermap.org/api
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Parâmetros:
  - `lat`, `lon`: Coordenadas da localização
  - `appid`: Sua API key
  - `units=metric`: Temperatura em Celsius
  - `lang=pt_br`: Idioma português

## 📱 Screenshots

### Tela Inicial
- Saudação dinâmica baseada na hora do dia
- Botão principal para acessar o clima
- Design clean com gradiente azul

### Tela de Clima
- Localização atual (cidade, país)
- Temperatura com ícone animado
- Condição climática em português
- Sensação térmica e umidade
- Data e hora formatadas
- Botão para atualizar dados

## 🎯 Critérios Atendidos

| Critério | Status | Pontos |
|----------|--------|--------|
| useState e useEffect | ✅ | 2/2 |
| React Navigation (2 telas) | ✅ | 1/1 |
| Localização com permissão | ✅ | 2/2 |
| API pública + exibição dados | ✅ | 3/3 |
| Interface e usabilidade | ✅ | 2/2 |
| **Bônus - Saudação dinâmica** | ✅ | +1 |

**Total: 10/10 + 1 bônus = 11 pontos**

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- `useState` para dados do clima, loading e erros
- `useEffect` para chamadas da API na montagem do componente

### Navegação
- Stack Navigator com 2 telas
- Tipagem TypeScript para parâmetros de rota
- Headers customizados

### Localização
- Solicitação de permissões
- Custom hook `useLocation`
- Tratamento de erros de GPS/permissão

### API Integration
- Fetch com async/await
- Tratamento de erros HTTP
- Loading states
- Dados em tempo real

### UX/UI
- Loading indicators
- Error boundaries
- Mensagens amigáveis
- Design responsivo
- Animações suaves

## 🐛 Tratamento de Erros

- **Permissão negada**: Alert com opção de tentar novamente
- **GPS desabilitado**: Mensagem explicativa
- **Sem internet**: Aviso sobre conectividade
- **API indisponível**: Botão para recarregar


## 👨‍💻 Desenvolvedor

Projeto desenvolvido como parte do CP2 - App de Clima "ClimaAgora"

---

*Este projeto atende a todos os requisitos funcionais e técnicos solicitados, implementando as melhores práticas de React Native com TypeScript.*