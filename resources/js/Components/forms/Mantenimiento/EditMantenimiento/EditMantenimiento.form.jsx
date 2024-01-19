import * as Yup from 'yup';

export function initialValue(Mtto) { 
  return {
    nombre       :Mtto.Nombre,
    descripcion  :Mtto.descripcion,
    Tipo         :Mtto.tipe,
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre      : Yup.string().required(' El nombre es requerido '),
    descripcion : Yup.string().required(' La descripcion es requerida '),
    Tipo        : Yup.string().required(' El Tipo es requerido ')
 });
}
