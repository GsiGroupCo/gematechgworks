import * as Yup from 'yup';

export function initialValue() {
  return {
    Empresa      : '',
    Ot           : '',
    Fecha_Salida : '',
    Destino      : '',
    Descripcion  : ''
  };
}

export function validationSchema() {
  return Yup.object({
    Empresa: Yup.string().required('Le Empresa es requerida'),
    Ot: Yup.string().required('La OT es requerida'),
    Fecha_Salida: Yup.string().required('La Fecha de salida es requerida'),
    Destino: Yup.string().required('El Destino es requerido'),
 });
}
