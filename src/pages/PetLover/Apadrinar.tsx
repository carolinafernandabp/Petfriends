import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

export const Apadrinar: React.FC = ()  => {


    return (

        <IonPage>
                <IonHeader>
                    <IonToolbar >
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Apadrinar</IonTitle>
                    </IonToolbar>
                </IonHeader>
        </IonPage>
    );
}