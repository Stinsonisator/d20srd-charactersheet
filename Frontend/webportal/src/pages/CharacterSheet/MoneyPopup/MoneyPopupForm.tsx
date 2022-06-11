import { useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

import { MoneyPopUpModel } from './MoneyPopup';

interface Props {
	modelField: keyof Pick<MoneyPopUpModel, 'toPay' | 'paying'>;
}

function MoneyPopupForm({ modelField }: Props) {
	const { values, touched, errors, handleChange, handleBlur } = useFormikContext<MoneyPopUpModel>();
	const firstField = useRef<HTMLInputElement>();

	useEffect(() => {
		firstField.current.focus();
	}, []);

	return (
		<>
			<TextField
				inputRef={firstField}
				id={`${modelField}.copper`}
				name={`${modelField}.copper`}
				label="Copper"
				type="number"
				value={values[modelField].copper ?? ''}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched[modelField]?.copper && Boolean(errors[modelField]?.copper)}
				helperText={touched[modelField]?.copper && errors[modelField]?.copper}
			/>
			<TextField
				id={`${modelField}.silver`}
				name={`${modelField}.silver`}
				label="Silver"
				type="number"
				value={values[modelField].silver ?? ''}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched[modelField]?.silver && Boolean(errors[modelField]?.silver)}
				helperText={touched[modelField]?.silver && errors[modelField]?.silver}
			/>
			<TextField
				id={`${modelField}.gold`}
				name={`${modelField}.gold`}
				label="Gold"
				type="number"
				value={values[modelField].gold ?? ''}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched[modelField]?.gold && Boolean(errors[modelField]?.gold)}
				helperText={touched[modelField]?.gold && errors[modelField]?.gold}
			/>
			<TextField
				id={`${modelField}.platinum`}
				name={`${modelField}.platinum`}
				label="Platinum"
				type="number"
				value={values[modelField].platinum ?? ''}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched[modelField]?.platinum && Boolean(errors[modelField]?.platinum)}
				helperText={touched[modelField]?.platinum && errors[modelField]?.platinum}
			/>
		</>
	);
}

export default MoneyPopupForm;
