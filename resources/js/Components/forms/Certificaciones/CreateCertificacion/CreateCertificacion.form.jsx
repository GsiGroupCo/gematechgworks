import * as Yup from 'yup';

export function initialValue(Activo) {
  return {
    File:'',
    frecuencia:'',
    fechacertificacion:''
  };
}

export function validationSchema(initialValues) {
  return Yup.object({
    frecuencia: Yup.string().required('La frecuencia de la certificacion es necesaria'),
    fechacertificacion: Yup.string().required('La Fecha de la Certificacion es necesaria'),
 });
}
