import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre          : '',
    taq : '',
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required('El Nombre es requerido'),
    taq: Yup.string().required('El Serial es requerido')
  });
}
