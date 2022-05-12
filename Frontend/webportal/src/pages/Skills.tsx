import { useCallback, useMemo } from 'react';

import { Button, Checkbox, Icon, IconButton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';

import SkillEditor from '../components/SkillEditor';
import { useDeleteSkillMutation, useGetSkillsQuery } from '../services/api';
import { globalRender } from '../services/globalRenderSlice';
import { AppDispatch } from '../services/store';

function Skills() {
	const { data, isLoading } = useGetSkillsQuery();
	const [deleteSkill] = useDeleteSkillMutation();
	const reduxDispatch = useDispatch<AppDispatch>();

	const showEditor = useCallback(
		(entityId?: number) => {
			reduxDispatch(globalRender({ key: 'skillEditor', component: <SkillEditor renderKey="skillEditor" entityId={entityId} /> }));
		},
		[reduxDispatch]
	);

	const performdeleteSkill = useCallback(
		(entityId: number) => {
			deleteSkill(entityId);
		},
		[deleteSkill]
	);

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'name', headerName: 'Name', flex: 1 },
			{ field: 'keyAbility', headerName: 'Key ability', flex: 1 },
			{ field: 'untrained', headerName: 'Untrained', flex: 1, renderCell: (params) => <Checkbox checked={params.value} /> },
			{
				field: 'id2',
				headerName: 'Actions',
				sortable: false,
				disableColumnMenu: true,
				renderCell: (params) => (
					<>
						<IconButton onClick={() => showEditor(params.row.id)}>
							<Icon className="fa-pen" sx={{ fontSize: 16 }} />
						</IconButton>
						<IconButton onClick={() => performdeleteSkill(params.row.id)}>
							<Icon className="fa-times" sx={{ fontSize: 16 }} />
						</IconButton>
					</>
				)
			}
		],
		[performdeleteSkill, showEditor]
	);

	return (
		<Stack spacing={2} sx={{ height: 750 }}>
			<Box>
				<Button variant="contained" onClick={() => showEditor()}>
					Add
				</Button>
			</Box>
			<DataGrid
				rows={data ?? []}
				columns={columns}
				loading={isLoading}
				hideFooterPagination
				onRowDoubleClick={(params) => showEditor(params.row.id)}
				initialState={{
					sorting: { sortModel: [{ field: 'name', sort: 'asc' }] }
				}}
			/>
		</Stack>
	);
}

export default Skills;
