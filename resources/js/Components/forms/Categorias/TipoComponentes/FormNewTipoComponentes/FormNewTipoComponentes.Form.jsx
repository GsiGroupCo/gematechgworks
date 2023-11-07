import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre          : '',
    taq_componente_base : ''
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required('El Nombre es requerido'),
    taq_componente_base: Yup.string().required('El TAQ base es requerido')
  });
}
