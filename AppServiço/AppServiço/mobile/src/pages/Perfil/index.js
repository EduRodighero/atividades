import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { withNavigationFocus } from '@react-navigation/compat';


import api from '../../services/api';

import styles from './styles';

import logo from '../../assets/logo.png';

function Perfil({ isFocused }) {
  const navigation = useNavigation();
  const [nome, setNome] = useState();
  const [userPerfil, setUserPerfil] = useState('');


  async function LoadNome() {
    const nome = await AsyncStorage.getItem('userName');
    setNome(nome);
    return;
  }
  async function loadUserDetalhe() {
  
    const userId = await AsyncStorage.getItem('userId')
    const response = await api.get(`/users/${userId}`);
    setUserPerfil(response.data);
   
  }

  useEffect(() => {
    if(isFocused){
      LoadNome();
      loadUserDetalhe();
    }
    

  }, [isFocused]);



  async function handleSubmitUpdate() {
    navigation.navigate('PerfilUpdate')
  }

  async function handleSignout() {
    AsyncStorage.clear();
    navigation.navigate('SignIn')

  }
  return (
    <>
      
      <View style={styles.container} >

        <View style={styles.header}>
          <View style={styles.headerContainerLogo}>
            <Image source={logo} style={styles.headerLogo} />
            <Text style={styles.headerTitulo}>Perfil</Text>
          </View>

          <View >

            <Text style={styles.headerText}>
              Bem vindo:<Text style={styles.headerTextBold}> {nome}</Text>
            </Text>



          </View>

        </View>
        <ScrollView >
        <View style={styles.signoutContainer}>
        <TouchableOpacity onPress={handleSignout} style={styles.signout}>
          <Text style={styles.signoutText}>signout</Text>
        </TouchableOpacity>
        </View>
          <View data={userPerfil}>
            

            <View style={styles.ConteinerImage}>
              <Text style={styles.TitleImage}>Foto</Text>
              <Image source={{ uri: userPerfil.userImage_url }} style={styles.ImagePerfil} />
            </View>

            <View style={styles.ConteinerText}>

              <Text style={styles.Title}>Nome</Text>
              <Text style={styles.TextPerfil}>{userPerfil.name}</Text>

              <Text style={styles.Title}>E-mail</Text>
              <Text style={styles.TextPerfil}>{userPerfil.email}</Text>
              <Text style={styles.Title}>Data de nacimento</Text>
              <Text style={styles.TextPerfil}>{userPerfil.birthdate}</Text>

              <Text style={styles.Title}>Endere??o</Text>
              <Text style={styles.TextPerfil}>{userPerfil.address}</Text>

            </View>

            <TouchableOpacity onPress={handleSubmitUpdate} style={styles.swap}><Text style={styles.swapText}>Editar Perfil</Text></TouchableOpacity>

          </View>
        </ScrollView>
      </View>

    </>
  );
}
export default withNavigationFocus(Perfil);
