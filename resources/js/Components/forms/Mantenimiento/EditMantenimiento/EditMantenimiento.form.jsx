import * as Yup from 'yup';

export function initialValue(Mtto) {
  return {
    nombre       :Mtto[0].nombre,
    descripcion  :Mtto[0].descripcion,
    Tipo         :Mtto[0].tipe,
  };
}

export function validationSchema() {
  return Yup.object({    
    nombre      : Yup.string().required(' El nombre es requerido '),
    descripcion : Yup.string().required(' La descripcion es requerida '),
    Tipo        : Yup.string().required(' El Tipo es requerido ')
 });
}
