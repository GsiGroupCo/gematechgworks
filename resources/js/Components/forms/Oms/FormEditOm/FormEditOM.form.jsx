import * as Yup from 'yup';

export function initialValue(OTData) {  

  return {
    Ot: OTData.data[0].taqot,
    Empresa:OTData.data[0]. empresa.nombre,
    Responsable: OTData.data[0].responsable.taqresponsable,
    Descripcion:OTData.data[0].descripcion,
    Tipo:OTData.data[0].tipo,
    Clasificacion:OTData.data[0].clasot,
    Prioridad:OTData.data[0].prioridad,
  };
}

export function validationSchema() {
  return Yup.object({    
    Ot: Yup.string().required('La OT es requerida'),
    Empresa: Yup.string().required('Le Empresa es requerida'),
    Responsable: Yup.string().required('El Responsable es requerido'),
    Descripcion:Yup.string().required('La Descripcion es requerida'),
    Tipo: Yup.string().required('El Tipo es requerido'),
    Prioridad:Yup.string().required('La Prioridad es requerida'),
 });
}
