import * as Yup from 'yup';

export function initialValue() {
  return {
    Preoperacional  : '',
    Area            : '',
    Actividad       : '',
    Responsable     : ''
  };
}

export function validationSchema() {
  return Yup.object({
    Area: Yup.string().required('El Area es requerida'),
    Actividad: Yup.string().required('La Actividad es requerida'),
    Responsable: Yup.string().required('El Responsable es requerido')
 });
}
