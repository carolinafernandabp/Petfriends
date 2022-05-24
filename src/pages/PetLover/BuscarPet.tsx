import React, { useState } from "react";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader,
      IonIcon,
      IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";

import { firebaseConfig} from "../../firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import { pet } from '../../models/models';

import { Camera, CameraResultType } from '@capacitor/camera';
import { body, heart, heartOutline, pencil, search } from "ionicons/icons";
import { Pet } from "../OrganizacionesAmigas/crudPet";
import { FieldValue } from "firebase/firestore";
import { isEmpty } from "@firebase/util";

 //inicializar firebase
 if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const BuscarPet: React.FC = ()  => {

    const [listaPet, setListaPet] = useState < pet[] > ([]); 
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [raza, setRaza] = useState('');
    const [tamanio, setTamanio] = useState('');
    const [salud, setSalud] = useState('');
    const [caracter, setCaracter] = useState('');
    const [estado, setEstado] =useState('');
    const [chip, setChip] = useState('');
    const [avatarURL, setAvatarURL] = useState<any>('');
    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');


    const listar =async () => {
        try{

            let lista: pet[] = []
            const res = await firebase.firestore().collection('pet').get();
    
            res.forEach((doc) => {
                let obj = {
                    id: doc.id, 
                    nombre: doc.data().nombre,
                    edad: doc.data().edad,
                    raza: doc.data().raza,
                    tamanio: doc.data().tamanio,
                    salud: doc.data().salud,
                    caracter:doc.data().caracter,
                    estado: doc.data().estado,
                    chip: doc.data().chip,
                    avatarURL: doc.data().avatarURL,
                    region: doc.data().region,
                    comuna: doc.data().comuna
  
                };
                
                lista.push(obj)            
            });
            setListaPet(lista);
        
        }catch (error){}
        
    }


    useIonViewWillEnter(() =>{
        listar();
    })


    

    return(

        <IonPage>
        <IonHeader>
            <IonToolbar >
                <IonTitle>Petfriends</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent >
        <IonToolbar >
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Todas las mascotas</IonTitle>
            </IonToolbar>
        <IonCard>
        <IonItem>
        <IonLabel position="stacked">Región</IonLabel>
        <IonSelect  name="buscador" id="buscador" value={region} onIonChange={e => setRegion(e.detail.value)}>
              <IonSelectOption value="1"> Arica y Parinacota</IonSelectOption>
              <IonSelectOption value="2"> Tarapacá</IonSelectOption>
              <IonSelectOption value="3"> Antofagasta</IonSelectOption>
              <IonSelectOption value="4"> Atacama</IonSelectOption>
              <IonSelectOption value="5"> Coquimbo</IonSelectOption>
              <IonSelectOption value="6"> Valparaíso</IonSelectOption>
              <IonSelectOption value="7"> Metropolitana de Santiago</IonSelectOption>
              <IonSelectOption value="8"> Libertador General Bernardo O'Higgins</IonSelectOption>
              <IonSelectOption value="9"> Maule</IonSelectOption>
              <IonSelectOption value="10"> Ñuble</IonSelectOption>
              <IonSelectOption value="11"> Biobío</IonSelectOption>
              <IonSelectOption value="12"> la Araucanía</IonSelectOption>
              <IonSelectOption value="13"> Los Ríos</IonSelectOption>
              <IonSelectOption value="14"> Los Lagos</IonSelectOption>
              <IonSelectOption value="15"> Aysén del G. Carlos Ibañez del Campo</IonSelectOption>
              <IonSelectOption value="16"> Magallanes y de la Antártica Chilena</IonSelectOption>
            </IonSelect>
            </IonItem>
        <IonItem>
            <IonLabel position="stacked">Comuna</IonLabel>
            <IonSelect  value={comuna} onIonChange={e => setComuna(e.detail.value)}> 
              <IonSelectOption value="1"> Arica y Parinacota</IonSelectOption>
              <IonSelectOption value="2"> Tarapacá</IonSelectOption>
              <IonSelectOption value="3"> Antofagasta</IonSelectOption>
              <IonSelectOption value="4"> Atacama</IonSelectOption>
              <IonSelectOption value="5"> Coquimbo</IonSelectOption>
              <IonSelectOption value="6"> Valparaíso</IonSelectOption>
              <IonSelectOption value="7"> Metropolitana de Santiago</IonSelectOption>
              <IonSelectOption value="8"> Libertador General Bernardo O'Higgins</IonSelectOption>
              <IonSelectOption value="9"> Maule</IonSelectOption>
              <IonSelectOption value="10"> Ñuble</IonSelectOption>
              <IonSelectOption value="11"> Biobío</IonSelectOption>
              <IonSelectOption value="12"> la Araucanía</IonSelectOption>
              <IonSelectOption value="13"> Los Ríos</IonSelectOption>
              <IonSelectOption value="14"> Los Lagos</IonSelectOption>
              <IonSelectOption value="15"> Aysén del G. Carlos Ibañez del Campo</IonSelectOption>
              <IonSelectOption value="16"> Magallanes y de la Antártica Chilena</IonSelectOption>
            </IonSelect>
            </IonItem>
            <IonButton color="dark" expand="block"><IonIcon icon={search}/>Buscar</IonButton>
        </IonCard>

        <IonList>
            {listaPet.map(pet => (
                <IonCard  key={pet.id}>
                    <IonCardContent class="card-background-page"  >
                             
                            <img alt= ""  src= {pet.avatarURL}></img>
                            <IonCardTitle>{pet.nombre}</IonCardTitle>
                            <IonCardSubtitle>
                                <h3>Hola! Vivo en la región de {pet.region}.
                                    Tengo {pet.edad},
                                    mi raza es {pet.raza}.
                                    Soy {pet.tamanio}, mi salud se encuentra {pet.salud}.
                                    Soy una mascota {pet.caracter}.
                                    Estoy buscando a nuevo dueño! </h3> 
                            </IonCardSubtitle> 
                        
                       <IonButton routerLink="./Adoptar" color="success" expand="block" size="small">
                       <IonIcon icon={heart}></IonIcon>Adoptar</IonButton>
                       <IonButton routerLink="./Apadrinar" color='tertiary' expand="block" size="small">
                       <IonIcon icon={body}></IonIcon>Apadrinar</IonButton>
                   
                    </IonCardContent>
                </IonCard>
            ))}
        </IonList>

      </IonContent>
      
    </IonPage>
    );
};

export default BuscarPet; 
