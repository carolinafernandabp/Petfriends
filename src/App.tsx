import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet,
  IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {informationCircle,  lockClosed,  logOut,  person,  shieldCheckmark } from 'ionicons/icons';

import {Pet}  from './pages/OrganizacionesAmigas/crudPet';
import{ BuscarPet}  from './pages/PetLover/BuscarPet';
import{ Adoptar}  from './pages/PetLover/Adoptar';
import{ Apadrinar}  from './pages/PetLover/Apadrinar';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';



setupIonicReact();

const App: React.FC = () => (


  <IonApp>
    <IonReactRouter>

    <IonMenu side="start"  contentId="menuApp">


      <IonContent>
        <IonList>
          <IonItem lines='none'>
          <IonAvatar slot='start'><img src="../public/assets/icon/placeholder.png" alt="" /></IonAvatar>
          <IonLabel> Bienvenid@!</IonLabel>
          </IonItem>
        <IonMenuToggle>
          <IonItem routerLink="./crudPet" routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={person} ></IonIcon>
            <IonLabel>Organizaciones Amigas</IonLabel>
          </IonItem>
          </IonMenuToggle>
        <IonMenuToggle>
          <IonItem routerLink="./BuscarPet" routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={person} ></IonIcon>
            <IonLabel>PetLover</IonLabel>
          </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
          <IonItem routerLink="" routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={person} ></IonIcon>
            <IonLabel>Mi Perfil</IonLabel>
          </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
          <IonItem routerLink='' routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={lockClosed} ></IonIcon>
            <IonLabel>Cambiar contraseña</IonLabel>
          </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
          <IonItem routerLink='' routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={informationCircle} ></IonIcon>
            <IonLabel>Términos y condiciones</IonLabel>
          </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
          <IonItem routerLink='' routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={shieldCheckmark} ></IonIcon>
            <IonLabel>Politicas de privacidad</IonLabel>
          </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
          <IonItem routerLink='' routerDirection='none' lines='none'>
            <IonIcon color="medium" slot="start" icon={logOut} ></IonIcon>
            <IonLabel>Cerrar Sesión</IonLabel>
          </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>

    </IonMenu>

      <IonRouterOutlet id="menuApp">
       
        <Route path='/OrganizacionesAmigas' component={Pet} exact/>
        <Route path='/crudPet' component={Pet} exact/>
        <Route path='/PetLover' component={Pet} exact/>
        <Route path='/BuscarPet' component ={BuscarPet} exact/>
        <Route path='/Adoptar' component ={Adoptar} exact/>
        <Route path='/Apadrinar' component ={Apadrinar} exact/>
        <Redirect to='/crudPet'/>
      </IonRouterOutlet>

    </IonReactRouter>
  </IonApp>
);

export default App;
