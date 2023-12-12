import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre          : ''
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required('El Nombre es requerido')
  });
}
