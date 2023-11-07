import * as Yup from 'yup';

export function initialValue(Responsable) {
  return {
    primernombre    :Responsable[0].primernombre,
    segundonombre   :Responsable[0].segundonombre ? Responsable[0].segundonombre : '',
    primerapellido  :Responsable[0].primerapellido,
    segundoapellido :Responsable[0].segundoapellido ? Responsable[0].segundoapellido : '',
    id_cargo        :Responsable[0].id_cargo,
    urlImage        :'',
  };
}

export function validationSchema() {
  return Yup.object({    

 });
}
