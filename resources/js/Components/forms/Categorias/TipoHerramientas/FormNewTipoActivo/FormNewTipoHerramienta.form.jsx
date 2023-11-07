import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre          : '',
    taq_herramienta_base  : ''
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required('El Nombre es requerido'),
    taq_herramienta_base : Yup.string().required('El TAQ base es requerido')
  });
}
