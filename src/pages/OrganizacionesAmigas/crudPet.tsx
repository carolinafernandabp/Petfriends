import React, { useState } from "react";
import {IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader,  IonCardSubtitle,  IonCardTitle, IonContent, IonHeader,
     IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage,  IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from "@ionic/react";
     import { addOutline, calendarClearSharp, happySharp, medkitSharp, pawSharp, pencil, trashBinOutline } from "ionicons/icons";
import { firebaseConfig } from "../../firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { pet } from '../../models/models';

import { Camera, CameraResultType } from '@capacitor/camera';

import { Formik } from 'formik';

 //inicializar firebase
 if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const Pet: React.FC = ()  => {

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
    const [mensaje, setMensaje] = useState(false);
    const [bandera, setBandera] = useState(true);

    
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
                    caracter: doc.data().caracter,
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

    const crear = async () => {
        try {
            if(bandera){
                await firebase.firestore().collection('pet').add(
                    {nombre,edad,raza,tamanio,salud,caracter,estado,chip,avatarURL,region,comuna});
                
            }else{
                await firebase.firestore().collection('pet').doc(id).set(
                    {nombre,edad,raza,tamanio,salud,caracter,estado,chip,avatarURL,region,comuna});
                    setBandera(true);
  
            }
        } catch (error) {}
        setId('');
        setNombre('');
        setEdad('');
        setRaza('');
        setTamanio('');
        setSalud('');
        setCaracter('');
        setEstado('');
        setChip('');
        setAvatarURL('');
        setRegion('');
        setComuna('');
        setMensaje(true);
        listar();
    }

    const editar = async(id:string,nombre:string,edad:string,raza:string,tamanio:string,salud:string,caracter:string,estado:string,chip:string,avatarURL:string,region:string,comuna:string) =>{
        setId(id);
        setNombre(nombre);
        setEdad(edad);
        setRaza(raza);
        setTamanio(tamanio);
        setSalud(salud);
        setCaracter(caracter);
        setEstado(estado);
        setChip(chip);
        setAvatarURL(avatarURL);
        setRegion(region);
        setComuna(comuna);
        setBandera(false);
    }

    const eliminar = async(id:string) => {
        try{
            console.log(id)
            alert("Seguro que deseas eliminar?");
            await firebase.firestore().collection('pet').doc(id).delete();
            listar();
        }catch (error){}
    }

    useIonViewWillEnter(() =>{
        listar();
    })


    const takePicture = async()  => {

        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                //allowEditing: true,
                resultType: CameraResultType.Uri,
            });

            const path = cameraResult?.path || cameraResult?.webPath;

            setAvatarURL(path);
            console.log(imagePath);


            return true;
        }catch (e: any){
            console.log(e);
        }

    }

    function imagePath(imagePath: any) {
  
        //guardar imagen como url
    }


     
    return(

        
        <IonPage>
            <IonToast
                isOpen={mensaje}
                onDidDismiss={() => setMensaje(false)}
                message="Mascota ingresada exitosamente"
                duration={500}
            />
        <IonHeader>
            <IonToolbar>
                
                <IonTitle color="dark">Petfriends</IonTitle>
            </IonToolbar>
        </IonHeader>


        <IonContent fullscreen>
        <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle color="dark">Mascotas</IonTitle>
  
            </IonToolbar>
       <IonCard  >
           <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={nombre} 
            name="nombre"
            id="nombre"
            type="text"
            required
            onIonChange={e => setNombre(e.detail.value!)}> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Edad</IonLabel>
            <IonInput value={edad}
            type="text"
            onIonChange={e => setEdad(e.detail.value!)} > </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Raza</IonLabel>
            <IonInput value={raza} 
            type="text"
            onIonChange={e => setRaza(e.detail.value!)}> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Tamaño</IonLabel>
            <IonSelect  value={tamanio} onIonChange={e => setTamanio(e.detail.value)}>
              <IonSelectOption value="pequeño">Pequeño</IonSelectOption>
              <IonSelectOption value="mediano">Mediano</IonSelectOption>
              <IonSelectOption value="mediano a grande">Mediano a grande</IonSelectOption>
              <IonSelectOption value="grande">Grande</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Salud</IonLabel>
            <IonInput value={salud} 
            type="text"
            onIonChange={e => setSalud(e.detail.value!)}> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Personalidad</IonLabel>
            <IonInput value={caracter} 
            type="text"
            onIonChange={e => setCaracter(e.detail.value!)}> </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Estado</IonLabel>
            <IonSelect  value={estado} onIonChange={e => setEstado(e.detail.value)}>
              <IonSelectOption value={true}>Adoptado</IonSelectOption>
              <IonSelectOption value={false}>No adoptado</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonLabel position="stacked">Inscripción</IonLabel>
            <IonSelect  value={chip} onIonChange={e => setChip(e.detail.value)}>
              <IonSelectOption value="si tiene">Si tiene</IonSelectOption>
              <IonSelectOption value="No tiene">No tiene</IonSelectOption>
              <IonSelectOption value="No aplica">No aplica</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonLabel position="stacked">Región</IonLabel>
          <IonSelect  value={region} onIonChange={e => setRegion(e.detail.value)}>
              <IonSelectOption value="1">Arica y Parinacota</IonSelectOption>
              <IonSelectOption value="2">Tarapacá</IonSelectOption>
              <IonSelectOption value="3">Antofagasta</IonSelectOption>
              <IonSelectOption value="4">Atacama</IonSelectOption>
              <IonSelectOption value="5">Coquimbo</IonSelectOption>
              <IonSelectOption value="6">Valparaíso</IonSelectOption>
              <IonSelectOption value="7">Metropolitana de Santiago</IonSelectOption>
              <IonSelectOption value="8">Libertador General Bernardo O'Higgins</IonSelectOption>
              <IonSelectOption value="9">Maule</IonSelectOption>
              <IonSelectOption value="10">Ñuble</IonSelectOption>
              <IonSelectOption value="11">Biobío</IonSelectOption>
              <IonSelectOption value="12">Araucanía</IonSelectOption>
              <IonSelectOption value="13">Los Ríos</IonSelectOption>
              <IonSelectOption value="14">Los Lagos</IonSelectOption>
              <IonSelectOption value="15">Aysén del G. Carlos Ibañez del Campo</IonSelectOption>
              <IonSelectOption value="16">Magallanes y de la Antártica Chilena</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonLabel position="stacked">Comuna</IonLabel>
          <IonSelect  value={comuna} onIonChange={e => setRegion(e.detail.value)}>
              <IonSelectOption value="1">Comuna1</IonSelectOption> 
            </IonSelect>
          </IonItem>

          <IonItem>
          <IonLabel position="stacked">Avatar</IonLabel>
            <IonButton onClick={takePicture} expand="block" color="light"> Tomar fotografía o seleccionar una </IonButton>
          </IonItem>
    
          <IonButton color="success" expand="block" type="submit" 
            onClick={() => crear() }>
            <IonIcon icon={addOutline}>
            </IonIcon>{bandera?'Pet':'Editar'}</IonButton>
          </IonCard>

          <IonList>
            {listaPet.map(pet => (
                <IonCard key={pet.id}>
                    <img alt="" src={pet.avatarURL}/>
                    <IonCardHeader>
                        <IonCardSubtitle>{pet.estado}</IonCardSubtitle>
                        <IonCardTitle>{pet.nombre}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem lines="none">
                        <IonIcon color="medium" slot="start" size="small" icon={calendarClearSharp} ></IonIcon>
                            <IonLabel>Edad: {pet.edad}</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                        <IonIcon color="medium" slot="start" size="small" icon={pawSharp} ></IonIcon>
                            <IonLabel>Raza: {pet.raza}</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                        <IonIcon color="medium" slot="start" size="small" icon={medkitSharp} ></IonIcon>
                            <IonLabel>Salud: {pet.salud}</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                        <IonIcon color="medium" slot="start" size="small" icon={happySharp} ></IonIcon>
                            <IonLabel>Personalidad: {pet.caracter}</IonLabel>
                        </IonItem>

                    <IonButton 
                    color="danger" 
                    expand="block" 
                    onClick={() => eliminar(''+pet.id)}>
                    <IonIcon icon={trashBinOutline}></IonIcon> 
                    Eliminar</IonButton>

                    <IonButton 
                    color="tertiary" 
                    expand="block" 
                    onClick={() =>editar(''+pet.id,''+pet.nombre,''+pet.edad,''+pet.raza,
                    ''+pet.tamanio,''+pet.salud,''+pet.caracter,''+pet.estado,''+pet.chip,''+pet.avatarURL,''+pet.region,''+pet.comuna)}>
                    <IonIcon icon={pencil}></IonIcon>Editar
                    </IonButton>

                
                    </IonCardContent>
                </IonCard>
            ))}
        </IonList>

      </IonContent>
      
    </IonPage>
    );
};


