import * as Yup from 'yup';

export function initialValue(Activo) { 
  return {
    taqComponente:'', 
  };
}

export function validationSchema(initialValues) {
  return Yup.object({});
}
