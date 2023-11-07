import * as Yup from 'yup';

export function initialValue() {
  return {
    Nombre: '',
    value:''
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().required('La Fecha de salida es requerida'),
    value:Yup.string().required('El valor es requerido')
 });
}
