import * as Yup from 'yup';

export function initialValue() {
  return {
    taqempresa: '',
    id_tipo:    '',
    nombre:     '',
    descripcion:'',
    serial:     '',
    dependencia:'',
    horasuso:   '',
    Image:      ''
  };
}

export function validationSchema() {
  return Yup.object({
    taqempresa: Yup.string().required('La Empresa es Obligatorio'),
    id_tipo: Yup.string().required('El Tipo es Obligatorio'),
    nombre: Yup.string().required('El Nombre es requerido'),
    serial: Yup.string().required('El Serial es requerido'),
    dependencia: Yup.string().required('La Dependencia es requerida'),
  });
}
