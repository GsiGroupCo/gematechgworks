import * as Yup from 'yup';

export function initialValue() {
  return { 
    id_tipo:     '',
    nombre:      '',
    serial:      '',
    descripcion: '', 
    horasuso:    '',
    Image:       ''
  };
}

export function validationSchema() {
  return Yup.object({ 
    id_tipo: Yup.string().required('El Tipo es Obligatorio'),
    nombre: Yup.string().required('El Nombre es requerido'),
    serial: Yup.string().required('El Serial es requerido'), 
  });
}
