import * as Yup from 'yup';

export function initialValue(Activo) {
  return {
    taqActivos    : Activo[0].taqActivos,
    Nombre        : Activo[0].nombre,
    Descripcion   : Activo[0].descripcion ? Activo[0].descripcion : '',
    Dependencia   : Activo[0].dependencia ? Activo[0].dependencia : '',
    Serial        : Activo[0].serial ? Activo[0].serial : '',
    Horas_Uso     : Activo[0].horasuso,
    Imagen:''
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().required('El nombre es requerido'),
    Serial: Yup.string().required('El Serial es requerido'),
    Dependencia: Yup.string().required('La dependencia del activo es requerida'),
    Imagen:Yup.string()
 });
}