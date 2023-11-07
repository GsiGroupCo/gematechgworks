import * as Yup from 'yup';

export function initialValue() {
  return {
    Mantenimiento   : '',
    Area            : '',
    Activo          : '',
    Responsable     : '',
    Fecha           : ''
  };
}

export function validationSchema() {
  return Yup.object({
    Area: Yup.string().required('El Area es requerido'),
    Mantenimiento: Yup.string().required('El Mantenimiento es requerido'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Fecha: Yup.string().required('La Fecha es requerida')
 });
}
