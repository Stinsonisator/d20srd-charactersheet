import { Button, Icon, IconButton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';

import SkillEditor from '../components/SkillEditor';
import { useGetSkillsQuery } from '../services/api';
import { globalRender } from '../services/globalRenderSlice';
import { AppDispatch } from '../services/store';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', flex: 1 },
	{ field: 'name', headerName: 'Name', flex: 1 },
	{ field: 'keyAbility', headerName: 'Key ability', flex: 1 },
	{ field: 'trainedOnly', headerName: 'Trained', flex: 1 },
	{
		field: 'id2',
		headerName: 'Actions',
		sortable: false,
		disableColumnMenu: true,
		renderCell: (params) => (
			<>
				<IconButton onClick={() => console.log(params)}>
					<Icon className="fa-pen" sx={{ fontSize: 16 }} />
				</IconButton>
			</>
		)
	}
];

function Skills() {
	const { data, isLoading } = useGetSkillsQuery();
	const reduxDispatch = useDispatch<AppDispatch>();

	function showEditor(): void {
		reduxDispatch(globalRender({ key: 'skillEditor', component: <SkillEditor renderKey="skillEditor" /> }));
	}

	return (
		<Stack spacing={2} sx={{ height: 750 }}>
			<Box>
				<Button variant="contained" onClick={showEditor}>
					Add
				</Button>
			</Box>
			<DataGrid rows={data ?? []} columns={columns} loading={isLoading} />
		</Stack>
	);
}

export default Skills;
