import * as Yup from 'yup';

export function initialValue() {
  return {
    nombre          : '',
    taq_activo_base : '',
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required('El Nombre es requerido'),
    taq_activo_base: Yup.string().required('El Serial es requerido')
  });
}
