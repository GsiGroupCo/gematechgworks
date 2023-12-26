import * as Yup from 'yup';

export function initialValue(Componente) { 
  return {
    taqComponente  :Componente.taqComponente, 
    Tipo           :Componente.id_tipo,
    Nombre         :Componente.nombre,
    Serial         :Componente.serial      ? Componente.serial      : '',
    Horas_Uso      :Componente.horasuso,
    Descripcion    :Componente.descripcion ? Componente.descripcion : '',
    Imagen:''
  };
}

export function validationSchema(initialValues) {
  return Yup.object({
    taqComponente: Yup.string()
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
