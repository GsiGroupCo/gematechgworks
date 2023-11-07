import * as Yup from 'yup';

export function initialValue(Activo) {
  return {
    taqempresa : Activo[0].taqempresa,
    nombre     : Activo[0].nombre,
    serial     : Activo[0].serial,
    area       : Activo[0].area,
    horasuso   : Activo[0].horasuso,
    Imagen     :''
  };
}

export function validationSchema() {
  return Yup.object({
    taqempresa: Yup.string().required('La empresa es requerida'),
    nombre: Yup.string().required('El nombre es requerido'),
    serial: Yup.string().required('El serial es requerido'),
    area: Yup.string().required('El area es requerida'),
    Imagen:Yup.string()
 });
}