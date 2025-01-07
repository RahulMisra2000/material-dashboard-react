import React, { useEffect, useState } from "react";
import {
  Alert,
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
  Toolbar,
  Typography,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDAlert from "../../components/MDAlert";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { supabase } from "../../backendAsService/supabase-config";
import { isBefore, isAfter, isWithinInterval, addDays } from "date-fns";
import "../SupabaseCrud/CrudComponent.css";
import PropTypes from "prop-types";

import { useUser } from "../../context/UserContext"; // Import the custom hook to access user context

const tableName = `masterrequests`;

const CustomToolbar = ({ onAddClick }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <Button
        variant="text"
        color="primary"
        size="small"
        startIcon={<AddIcon />}
        onClick={onAddClick}
      >
        Add Request
      </Button>
    </GridToolbarContainer>
  );
};

const CrudComponent = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState({});

  // bgColor: primary / secondary / info / success / warning / error / light / dark
  const [stateMessage, setStateMessage] = useState({ msg: null, bgColor: "info" });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  // eslint-disable-next-line
  const { user, loading, error } = useUser();
  const today = new Date();

  const renderAlert = (
    <MDAlert color={stateMessage.bgColor} dismissible>
      <MDTypography variant="body2" color="white">
        {stateMessage.msg}
      </MDTypography>
    </MDAlert>
  );

  const getRowClassName = (params) => {
    const rowDate = new Date(params.row.reminderdate?.trim()); // Convert date string to Date object

    // Check if the date is null or not a valid date
    if (!rowDate || isNaN(new Date(rowDate).getTime())) {
      return ""; // Return empty string if date is null or invalid
    }

    if (isBefore(rowDate, today)) {
      return "row-before-today"; // Dates before today
    } else if (
      isWithinInterval(rowDate, {
        start: today,
        end: addDays(today, 7),
      })
    ) {
      return "row-today-to-week"; // Dates between today and one week from today (inclusive)
    } else if (isAfter(rowDate, addDays(today, 7))) {
      return "row-after-week"; // Dates beyond one week from today
    }
    return ""; // Default class if none of the above conditions are met
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const msg = `Error fetching records in SupabseCrud/index.js`;

    try {
      const { data, error } = await supabase
        .from(tableNamea)
        .select("*")
        .is("resolveddate", null)
        .order("reminderdate", { ascending: true })
        .order("providercode", { ascending: true })
        .order("reportidsuffix", { ascending: true });

      if (error) {
        setRecords([]);
        throw new Error(error || "Unknown error");
      } else {
        setRecords(data);
      }
    } catch (e) {
      console.error({ msg, e }); // show both error messages in console
      setStateMessage({ msg: msg, bgColor: "error" }); // show only sanitized message to the user
      setRecords([]);
    }
  };

  const handleAddClick = () => {
    setFormData({}); // Clear the form data
    setIsAddDialogOpen(true); // Open the dialog for adding a new record
  };

  const handleUpdateClick = (record) => {
    setSelectedRecord(record);
    setFormData(record);
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  const addRecord = async () => {
    const msg = `Error adding record in SupabseCrud/index.js`;

    const source = `REACT`;
    const status = `NEW`;
    const requestedby = user?.email || "Unknown from React";

    const { providercode, reminderdate, reportidsuffix, description } = formData;
    const payloadData = {
      providercode,
      reminderdate,
      reportidsuffix,
      description,

      recordtype: source,
      status,
      requestedby,
    };

    try {
      const { error } = await supabase.from(tableName).insert([payloadData]);

      if (error) {
        throw new Error(error || "Unknown error");
      }

      setStateMessage({ msg: "Record added successfully", bgColor: "success" });
      fetchRecords();
    } catch (e) {
      console.error({ msg, e }); // show both error messages in console
      setStateMessage({ msg: msg, bgColor: "error" }); // show only sanitized message to the user
    } finally {
      setIsAddDialogOpen(false); // Close Add Dialog
    }
  };

  const updateRecord = async () => {
    const msg = `Error updating record in SupabseCrud/index.js`;

    const { id, ...remainingData } = formData; // Exclude 'id' from the payload for starters
    const requestedby = user?.email || "Unknown from React";

    // Fields that can be updated in the Supabase table
    const { providercode, reminderdate, reportidsuffix, description } = remainingData;

    // Only contents of the payload data will update the record
    const payloadData = {
      providercode,
      reminderdate,
      reportidsuffix,
      description,
      requestedby,
    };

    try {
      const { error } = await supabase.from(tableName).update(payloadData).eq("id", id);

      if (error) {
        throw new Error(error || "Unknown error");
      }
      setStateMessage("Record updated successfully.");
      fetchRecords();
    } catch (e) {
      console.error({ msg, e }); // show both error messages in console
      setStateMessage({ msg: msg, bgColor: "error" }); // show only sanitized message to the user
    } finally {
      setIsUpdateDialogOpen(false); // Close Add Dialog
    }
  };

  const deleteRecord = async () => {
    const msg = `Error deleting record in SupabseCrud/index.js`;

    const { id } = selectedRecord;

    try {
      const { error } = await supabase.from(tableName).delete().eq("id", id);
      if (error) {
        throw new Error(error || "Unknown error");
      }
      setStateMessage("Record deleted successfully.");
      fetchRecords();
    } catch (e) {
      console.error({ msg, e }); // show both error messages in console
      setStateMessage({ msg: msg, bgColor: "error" }); // show only sanitized message to the user
    } finally {
      setIsDeleteDialogOpen(false); // Close Add Dialog
    }
  };

  // Cell click handler for the specific column (e.g., 'requestworksheetrownumber' column)
  const handleUrlClick = (requestworksheetrownumber) => {
    const url = `https://docs.google.com/spreadsheets/d/1rim4cgB2uWV55vkKD-bZeipsc9YZbeHeSrWUb7aZvWs/edit#gid=0&range=A${requestworksheetrownumber}`;
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation for the form
  const isFormValid = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return (
      formData.providercode &&
      formData.reportidsuffix &&
      formData.description &&
      datePattern.test(formData.reminderdate)
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "providercode", headerName: "Provider", width: 100 },
    { field: "recordtype", headerName: "Source", width: 150 },
    { field: "reminderdate", headerName: "Reminder", width: 150 },
    { field: "requestedby", headerName: "Requested", width: 150 },
    { field: "reportidsuffix", headerName: "Request Chain", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "description", headerName: "Internal Note", width: 400 },

    { field: "respondby", headerName: "Deadline", width: 150 },
    { field: "resolveddate", headerName: "Resolved", width: 150 },

    {
      field: "requestworksheetrownumber",
      headerName: "Request Sheet",
      width: 75,
      sortable: false,
      renderCell: (params) => {
        if (params.row.requestworksheetrownumber) {
          return (
            <Box>
              <IconButton onClick={() => handleUrlClick(params.row.requestworksheetrownumber)}>
                <FindInPageIcon />
              </IconButton>
            </Box>
          );
        } else {
          return null;
        } // Return null if the cell is empty
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleUpdateClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* TITLE */}
      <Typography variant="h4" gutterBottom>
        CRUD Operations with Supabase
      </Typography>

      {/* DATA GRID */}
      <TableContainer>
        <DataGrid
          rows={records}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[5, 10, 15, 20]} // Use 'pageSizeOptions' instead of 'rowsPerPageOptions'
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          getRowClassName={getRowClassName}
          slots={{
            toolbar: () => <CustomToolbar onAddClick={handleAddClick} />, // Pass the component and bind the props
          }}
        />
      </TableContainer>

      {/* DIALOG WINDOWS */}
      <Dialog open={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)}>
        <DialogTitle>Update Record</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Provider"
            name="providercode"
            value={formData.providercode || "ACC"}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Remind By (Date)"
            name="reminderdate"
            value={formData.reminderdate || ""}
            onChange={handleChange}
            fullWidth
            inputProps={{
              pattern: "^d{4}-d{2}-d{2}$", // Regex for YYYY-MM-DD format
            }}
            helperText="Please enter the date in YYYY-MM-DD format"
            error={formData.reminderdate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.reminderdate)} // Show error if format is incorrect
          />
          <TextField
            margin="dense"
            label="Request Chain"
            name="reportidsuffix"
            value={formData.reportidsuffix || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Internal Note"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={updateRecord}
            variant="contained"
            color="primary"
            disabled={!isFormValid()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this record?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={deleteRecord} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
        <DialogTitle>Add Request</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Provider"
            name="providercode"
            value={formData.providercode || "ACC"}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Remind By (Date)"
            name="reminderdate"
            value={formData.reminderdate || ""}
            onChange={handleChange}
            fullWidth
            inputProps={{
              pattern: "^d{4}-d{2}-d{2}$", // Regex for YYYY-MM-DD format
            }}
            helperText="Please enter the date in YYYY-MM-DD format"
            error={formData.reminderdate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.reminderdate)} // Show error if format is incorrect
          />
          <TextField
            margin="dense"
            label="Request Chain"
            name="reportidsuffix"
            value={formData.reportidsuffix || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Internal Note"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={addRecord} variant="contained" color="primary" disabled={!isFormValid()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* ALERT */}
      {stateMessage.msg && renderAlert}
    </Box>
  );
};

CustomToolbar.propTypes = {
  onAddClick: PropTypes.func.isRequired, // Validate that it's a function and required
};

export default CrudComponent;
