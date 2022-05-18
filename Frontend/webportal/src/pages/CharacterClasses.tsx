import { useCallback, useMemo } from 'react';

import { Button, Icon, IconButton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';

import CharacterClassEditor from '../components/CharacterClassEditor';
import { useDeleteCharacterClassMutation, useGetCharacterClassesQuery } from '../services/api';
import { globalRender } from '../services/globalRenderSlice';
import { AppDispatch } from '../services/store';

function CharacterClasses() {
	const { data, isLoading } = useGetCharacterClassesQuery();
	const [deleteCharacterClass] = useDeleteCharacterClassMutation();
	const reduxDispatch = useDispatch<AppDispatch>();

	const showEditor = useCallback(
		(entityId?: number) => {
			reduxDispatch(globalRender({ key: 'characterClassEditor', component: <CharacterClassEditor renderKey="characterClassEditor" entityId={entityId} /> }));
		},
		[reduxDispatch]
	);

	const performdeleteCharacterClass = useCallback(
		(entityId: number) => {
			deleteCharacterClass(entityId);
		},
		[deleteCharacterClass]
	);

	const columns: GridColDef[] = useMemo(
		() => [
			{ field: 'name', headerName: 'Name', flex: 1 },
			{
				field: 'actions',
				headerName: 'Actions',
				sortable: false,
				disableColumnMenu: true,
				renderCell: (params) => (
					<>
						<IconButton onClick={() => showEditor(params.row.id)}>
							<Icon className="fa-pen" sx={{ fontSize: 16 }} />
						</IconButton>
						<IconButton onClick={() => performdeleteCharacterClass(params.row.id)}>
							<Icon className="fa-times" sx={{ fontSize: 16 }} />
						</IconButton>
					</>
				)
			}
		],
		[performdeleteCharacterClass, showEditor]
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

export default CharacterClasses;
