import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../backendAsService/supabase-config";

const tableName = `masterrequests`;

const CrudComponent = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error("Error fetching records:", error);
    } else {
      setRecords(data);
    }
  };

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setFormData(record);
    setIsDialogOpen(true);
  };

  const handleDelete = (record) => {
    setSelectedRecord(record);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const { id } = selectedRecord;
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
      console.error("Error deleting record:", error);
    } else {
      setSnackbarMessage("Record deleted successfully.");
      fetchRecords();
    }
    setIsDeleteOpen(false);
  };

  const saveChanges = async () => {
    const { id, ...remainingData } = formData; // Exclude 'id' from the payload for starters

    // Fields that can be updated in the Supabase table
    const { respondby, description } = remainingData;

    // Only contents of the payload data will update the record
    const payloadData = { respondby, description };
    const { error } = await supabase.from(tableName).update(payloadData).eq("id", id);

    if (error) {
      console.error("Error updating record:", error);
    } else {
      setSnackbarMessage("Record updated successfully.");
      fetchRecords();
    }
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeSnackbar = () => setSnackbarMessage("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "providercode", headerName: "Provider", width: 150 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "description", headerName: "Desc", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleUpdate(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        CRUD Operations with Supabase
      </Typography>
      <TableContainer>
        <DataGrid
          rows={records}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[5, 10, 15, 20]} // Use 'pageSizeOptions' instead of 'rowsPerPageOptions'
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
        />
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Update Record</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key) => {
            // What fields to show on the Update Form
            const includeFields = ["respondby", "description"];

            if (includeFields.includes(key)) {
              return (
                <TextField
                  key={key}
                  margin="dense"
                  label={key}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  fullWidth
                />
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveChanges} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this record?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CrudComponent;
