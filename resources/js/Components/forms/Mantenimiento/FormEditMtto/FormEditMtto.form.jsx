import * as Yup from 'yup';

export function initialValue(Mtto) {
  return {
    Nombre       :Mtto[0].Nombre,
    Descripcion  :Mtto[0].descripcion,
    Tipo         :Mtto[0].tipe,
  };
}

export function validationSchema() {
  return Yup.object({    
    Nombre      : Yup.string().required(' El nombre es requerido '),
    Descripcion : Yup.string().required(' La descripcion es requerida '),
    Tipo        : Yup.string().required(' El Tipo es requerido ')
 });
}
