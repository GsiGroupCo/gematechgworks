import * as Yup from 'yup';

export function initialValue(Activo) { 
  return {
    taqActivos  :Activo[0].taqActivos,
    taqempresa  :Activo[0].taqempresa,
    Tipo        :Activo[0].id_tipo,
    Nombre      :Activo[0].nombre,
    Serial      :Activo[0].serial      ? Activo[0].serial      : '',
    Horas_Uso   :Activo[0].horasuso,
    Descripcion :Activo[0].descripcion ? Activo[0].descripcion : '',
    Imagen:''
  };
}

export function validationSchema(initialValues) {
  return Yup.object({
    taqActivos: Yup.string()
      .required('El TAQ es requerido')
      .test('not-equal-to-initial', 'El TAQ no puede ser igual al TAQ anterior', function(value) {
        return value !== initialValues.activoid;
      }),
    Nombre: Yup.string().required('El Nombre es requerido'),
    Serial: Yup.string().required('El Serial es requerido'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Imagen:Yup.string()
 });
}
