import { createContext, useContext, useState } from 'react';

export const FormContext = createContext();

const FormProvider = ({ children }) => {
	const [data, setData] = useState({});
console.log("FORM DATA", data)
	const setFormValues = (values) => {
		setData((prev) => ({ ...prev, ...values }));
	};

	return (
		<FormContext.Provider value={{ data, setFormValues }}>
			{children}
		</FormContext.Provider>
	);
};

export const useFormData = () => useContext(FormContext);

export default FormProvider;
