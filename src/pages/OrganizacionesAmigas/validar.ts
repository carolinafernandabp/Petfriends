import React from "react";

 export const validar = ()  => {

    var nombre;

    nombre = document.getElementById("nombre");

    if(nombre = " "){
        alert("debe rellenar nombre");
        return false;
    }
 }
