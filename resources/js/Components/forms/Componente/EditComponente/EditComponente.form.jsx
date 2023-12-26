import * as Yup from 'yup';

export function initialValue(Componente) { 
  return {
    taqComponente   : Componente.taqComponente,
    Nombre          : Componente.nombre,
    Descripcion     : Componente.descripcion ? Componente.descripcion : '',
    Serial          : Componente.serial ? Componente.serial : '',
    Horas_Uso       : Componente.horasuso,
    Imagen :''
  };
}

export function validationSchema() {
  return Yup.object({
    Nombre: Yup.string().required('El nombre es requerido'),
    Serial: Yup.string().required('El Serial es requerido'),
    Imagen:Yup.string()
 });
}