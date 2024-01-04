import * as Yup from 'yup';

export function initialValue() {
  return { 
    categoria_id:    '',
    nombre:     '',
    descripcion:'',
    serial:     '',
    horasuso:   '',
    Image:      ''
  };
}

export function validationSchema() {
  return Yup.object({ 
    categoria_id: Yup.string().required('El Tipo es Obligatorio'),
    nombre: Yup.string().required('El Nombre es requerido'),
    serial: Yup.string().required('El Serial es requerido'),
  });
}
