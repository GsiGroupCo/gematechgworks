import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateDocumento.form';
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

const CreateDocumento = ({ Taq, route, onClose }) =>  {
 
  const [files, setFiles] = useState([]);
  const { data, post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async () => {
      data.Taq = Taq;
      files.forEach((file, index) => {
        const propertyName = `Image_${index + 1}`;
        data[propertyName] = file;
      });
      data.CantImages = files.length;
      post(`${route}`)
      onClose();
    }
  })

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(Array.from(selectedFiles)); 
  };
  
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file));
    };
  }, [files]);

  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = " w-[500px] md:w-[650px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3 "
      method = "POST"
      encType="multipart/form-data"
    >
      <h3 className='font-bold'>
        Subiendo Archivo
      </h3> 
      {
        files.length > 0 ?  (
          <div className='w-full h-full grid grid-cols-3 gap-4  px-4 py-2'>
            {
              files.map((file, index) => (
              <div key={index} className='w-auto max-w-[200px] max-h-[150px] h-auto rounded-md'>
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`File ${index}`}
                    className="w-full h-full object-cover "
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full border-2 px-4 py-2 border-gray-300 border-dashed rounded-lg">
                    <p>{file.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <label htmlFor="Image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span> o selecciona y desliza aqui </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="Image"
              name="Image"
              type="file"
              accept="image/*,.pdf,.doc,.docx" 
              multiple  
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )
      }
      {
        formik.touched.taq && formik.errors.taq && (
          <div className="text-red-500 font-bold">{formik.errors.taq}</div>
        )
      }
      <input type="submit" value = "Subir Documento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateDocumento;
