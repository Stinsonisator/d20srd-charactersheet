import { Fragment } from 'react';

import { Button, Checkbox, FormLabel, Grid, Icon, IconButton, MenuItem, TextField } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import filter from 'lodash/filter';
import find from 'lodash/find';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { useGetSkillsQuery } from '../../services/api';
import { Skill } from '../../types/Skill';

function Synergies() {
	const { values, setFieldValue, handleChange } = useFormikContext<Skill>();
	const { data: skills } = useGetSkillsQuery();

	return (
		<FieldArray
			name="outgoingSkillSyngergies"
			render={(arrayHelpers) => (
				<Grid container spacing={2} my={1}>
					{map(values.outgoingSkillSyngergies, (skillSynergy, index) => (
						<Fragment key={`synergy_${index}`}>
							<Grid item xs={4}>
								<TextField
									label="Skill"
									select
									value={skillSynergy.destinationSkillId || 0}
									onChange={(event) => {
										setFieldValue(`outgoingSkillSyngergies.${index}.destinationSkillId`, parseInt(event.target.value));
										setFieldValue(
											`outgoingSkillSyngergies.${index}.destinationSkill`,
											find(skills, { id: parseInt(event.target.value) })
										);
									}}
									required
								>
									{map(
										orderBy(
											filter(skills, (skill) => skill.id !== values.id),
											'name'
										),
										(skill) => (
											<MenuItem key={`skill_${skill.id}`} value={skill.id}>
												{skill.name}
											</MenuItem>
										)
									)}
								</TextField>
							</Grid>
							<Grid item xs={1}>
								<FormLabel component="legend">Conditional</FormLabel>
								<Checkbox
									checked={skillSynergy.isConditional}
									onChange={(_event, checked) => {
										setFieldValue(`outgoingSkillSyngergies.${index}.isConditional`, checked);
										if (!checked) setFieldValue(`outgoingSkillSyngergies.${index}.conditionDescription`, null);
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								{skillSynergy.isConditional && (
									<TextField
										id={`outgoingSkillSyngergies.${index}.conditionDescription`}
										name={`outgoingSkillSyngergies.${index}.conditionDescription`}
										label="Condition"
										value={values.outgoingSkillSyngergies[index].conditionDescription}
										onChange={handleChange}
									/>
								)}
							</Grid>
							<Grid item xs={1}>
								<FormLabel component="legend">&nbsp;</FormLabel>
								<IconButton onClick={() => arrayHelpers.remove(index)}>
									<Icon className="fa-times" />
								</IconButton>
							</Grid>
						</Fragment>
					))}
					<Grid item xs={12}>
						<Button variant="contained" onClick={() => arrayHelpers.push({ sourceSkillId: 0, isConditional: false })}>
							Add
						</Button>
					</Grid>

					{/* <DataGrid
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
					/> */}
				</Grid>
			)}
		/>
	);
}

export default Synergies;
