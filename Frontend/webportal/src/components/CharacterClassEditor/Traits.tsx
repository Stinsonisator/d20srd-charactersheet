import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridRenderCellParams } from '@mui/x-data-grid/models';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import findIndex from 'lodash/findIndex';
import minBy from 'lodash/minBy';

import { globalRender } from '../../services/globalRenderSlice';
import { CharacterClass, CharacterClassTrait } from '../../types/CharacterClass';
import { useAppDispatch } from '../../utils/hooks';
import CharacterClassTraitEditor from '../CharacterClassTraitEditor';

function Traits(): JSX.Element {
	const { values } = useFormikContext<CharacterClass>();
	const reduxDispatch = useAppDispatch();

	function showEditor(arrayHelpers: FieldArrayRenderProps, trait?: CharacterClassTrait): void {
		reduxDispatch(
			globalRender({
				key: 'traitEditor',
				component: (
					<CharacterClassTraitEditor
						renderKey="traitEditor"
						trait={trait}
						characterClassId={values.id}
						saveTrait={(newTrait) => {
							if (!newTrait.id) {
								newTrait.id = (minBy(values.traits, 'id')?.id ?? 0) - 1;
								arrayHelpers.push(newTrait);
							} else {
								arrayHelpers.replace(findIndex(values.traits, { id: newTrait.id }), newTrait);
							}
						}}
					/>
				)
			})
		);
	}

	return (
		<FieldArray
			name="traits"
			render={(arrayHelpers) => (
				<Stack sx={{ my: 2, height: 500 }}>
					<Box>
						<Button variant="contained" onClick={() => showEditor(arrayHelpers)}>
							Add
						</Button>
					</Box>

					<DataGrid
						rows={values.traits ?? []}
						columns={[
							{ field: 'name', headerName: 'Name', flex: 1 },
							{ field: 'level', headerName: 'Level' },
							{
								field: 'actions',
								headerName: 'Actions',
								sortable: false,
								disableColumnMenu: true,
								renderCell: (params: GridRenderCellParams) => (
									<>
										<IconButton onClick={() => showEditor(arrayHelpers, params.row)}>
											<Icon className="fa-pen" sx={{ fontSize: 16 }} />
										</IconButton>
										<IconButton onClick={() => arrayHelpers.remove(findIndex(values.traits, { id: params.row.id }))}>
											<Icon className="fa-times" sx={{ fontSize: 16 }} />
										</IconButton>
									</>
								)
							}
						]}
						hideFooterPagination
						onRowDoubleClick={(params) => showEditor(arrayHelpers, params.row)}
						initialState={{
							sorting: { sortModel: [{ field: 'level', sort: 'asc' }] }
						}}
					/>
				</Stack>
			)}
		/>
	);
}

export default Traits;
