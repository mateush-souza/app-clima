import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Alert,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import * as Location from 'expo-location';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';

type ClimaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Clima'
>;

interface Props {
  navigation: ClimaScreenNavigationProp;
}

interface DadosClima {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  sys: {
    country: string;
  };
}

export default function ClimaScreen({ navigation }: Props) {
  const [dadosClima, setDadosClima] = useState<DadosClima | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const API_KEY = '5c3d3a8972de60c15eed3e3f96f167fe';

  useEffect(() => {
    obterLocalizacaoEClima();
  }, []);

  const obterLocalizacaoEClima = async () => {
    try {
      setLoading(true);
      setErro(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErro('Permissão de localização negada');
        setLoading(false);
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir acesso à localização para obter dados do clima.',
          [
            { text: 'Tentar Novamente', onPress: obterLocalizacaoEClima },
            { text: 'Voltar', onPress: () => navigation.goBack() }
          ]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;

      await obterDadosClima(latitude, longitude);

    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setErro('Erro ao obter localização');
      setLoading(false);
      Alert.alert(
        'Erro',
        'Não foi possível obter sua localização. Verifique se o GPS está ativado.',
        [
          { text: 'Tentar Novamente', onPress: obterLocalizacaoEClima },
          { text: 'Voltar', onPress: () => navigation.goBack() }
        ]
      );
    }
  };

  const obterDadosClima = async (lat: number, lon: number) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      
      const data: DadosClima = await response.json();
      setDadosClima(data);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao obter dados do clima:', error);
      setErro('Erro ao obter dados do clima');
      setLoading(false);
      Alert.alert(
        'Erro',
        'Não foi possível obter os dados do clima. Verifique sua conexão com a internet.',
        [
          { text: 'Tentar Novamente', onPress: obterLocalizacaoEClima },
          { text: 'Voltar', onPress: () => navigation.goBack() }
        ]
      );
    }
  };

  const formatarDataHora = (): string => {
    const agora = new Date();
    return agora.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const obterIconeUrl = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4682B4" />
        <Text style={styles.loadingText}>Obtendo dados do clima...</Text>
      </View>
    );
  }

  if (erro || !dadosClima) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroText}>
          {erro || 'Erro desconhecido'}
        </Text>
        <TouchableOpacity 
          style={styles.botao}
          onPress={obterLocalizacaoEClima}
        >
          <Text style={styles.textoBotao}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.dataHora}>{formatarDataHora()}</Text>
        
        <Text style={styles.cidade}>
          {dadosClima.name}, {dadosClima.sys.country}
        </Text>

        <View style={styles.temperaturaContainer}>
          <Image 
            source={{ uri: obterIconeUrl(dadosClima.weather[0].icon) }}
            style={styles.iconeClima}
          />
          <Text style={styles.temperatura}>
            {Math.round(dadosClima.main.temp)}°C
          </Text>
        </View>

        <Text style={styles.condicao}>
          {dadosClima.weather[0].description}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Sensação Térmica</Text>
            <Text style={styles.infoValue}>
              {Math.round(dadosClima.main.feels_like)}°C
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Umidade</Text>
            <Text style={styles.infoValue}>
              {dadosClima.main.humidity}%
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.botaoAtualizar}
          onPress={obterLocalizacaoEClima}
        >
          <Text style={styles.textoBotao}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4682B4',
  },
  erroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  erroText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  dataHora: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  cidade: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  temperaturaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeClima: {
    width: 100,
    height: 100,
  },
  temperatura: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#4682B4',
    marginLeft: 10,
  },
  condicao: {
    fontSize: 20,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 120,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  botao: {
    backgroundColor: '#4682B4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
  },
  botaoAtualizar: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
  },
  botaoVoltar: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});