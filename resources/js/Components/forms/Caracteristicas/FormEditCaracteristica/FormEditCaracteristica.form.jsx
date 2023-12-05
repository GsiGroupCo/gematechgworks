import * as Yup from 'yup';

export function initialValue(Caracteristicas) {
  return {
    Nombre: Caracteristicas.nombre,
    value: Caracteristicas.valor
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().required('El nombre es requerido'),
    value:Yup.string().required('El valor es requerido')
 });
}
