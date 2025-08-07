import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Alert, AlertTitle, Divider, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getColumnDefinitions } from './columnDefinitions';
import { deleteRoster, getRosters } from '../../api/roster';


const ListRosters = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ bannerInfo, setBannerInfo ] = useState(null);
  const [ rosters, setRosters ] = useState([]);
  const navigate = useNavigate();

  const fetchRosters = async () => {
    setIsLoading(true);
    const rosters = await getRosters();
    setRosters(rosters);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRosters();
  }, []);

  const handleOnEdit = ({ row }) => {
    const { id } = row;
    navigate(`/edit/${id}`);
  };

  // TODO: Add confirmation modal to confirm deletion.
  const handleOnDelete = async ({ row }) => {
    setIsLoading(true);
    const { id, name } = row;
    const { res, error } = await deleteRoster(id);
    if (error) {
      setBannerInfo({
        title: 'Error',
        severity: 'error',
        message: `Failed to delete ${name}, please try again.` 
      });
    } else {
      setBannerInfo({
        title: 'Success',
        severity: 'success',
        message: `Successfully deleted ${name}` 
      });
      fetchRosters();
    }
  };

  const columns = useMemo(() => {
    return getColumnDefinitions({
      onEdit: handleOnEdit,
      onDelete: handleOnDelete
    })
  }, []);

  return (
    <Box sx={{ maxHeight: '75vh', margin: '48px' }}>
      
      {bannerInfo &&
        <Alert severity={bannerInfo.severity} onClose={() => setBannerInfo(null)}>
          <AlertTitle>{bannerInfo.title}</AlertTitle>
          {bannerInfo.message}
        </Alert>
      }
      <Typography variant="h4">Your Rosters</Typography>
      <Divider />
      <DataGrid
        density='comfortable'
        sx={{ fontSize: '1.25rem', margin: '24px auto', width: 'fit-content', maxHeight: '70vh' }}
        rowSelection={false}
        rows={rosters}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={isLoading}
      />
    </Box>
  );
};

export default ListRosters;


