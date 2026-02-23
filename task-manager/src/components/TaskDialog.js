"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Pagination, Stack } from "@mui/material";


export default function TaskDialog({
  open,
  handleClose,
  handleSubmit,
  initialData,
  users,
  role,
}) {

  //pagination logic
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(1);


  const { control, handleSubmit: submitForm, reset, formState: { errors }, } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      assignedTo: "",
      assignedBy: "",
      dueDate: ""
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
        assignedTo: "",
        assignedBy: "",
      });
    }
  }, [initialData, reset]);
  const darkField = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "#111",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#333",
      },
      "&:hover fieldset": {
        borderColor: "#555",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6366F1",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#aaa",
    },
  };
  const onSubmit = (data) => {
    handleSubmit(data);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#0b0b0b",
          color: "#fff",
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: 22 }}>
        {initialData ? " Edit Task" : " Create New Task"}
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>

        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="outlined"
              sx={darkField}
            />
          )}
        />


        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={darkField}
            />
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          rules={{
            required: "Due date is required",
            validate: (value) =>
              new Date(value) > new Date() || "Date must be in the future",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Due Date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              sx={{
                ...darkField,

                "& input::-webkit-calendar-picker-indicator": {
                  filter: "invert(1)",
                },
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
            />
          )}
        />
        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1, opacity: 0.8 }}
        >
          Assignment & Status
        </Typography>


        <Controller
          name="assignedTo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Assign To"
              fullWidth
              margin="normal"
              sx={darkField}
            >
              <MenuItem value="">Unassigned</MenuItem>
              {users?.map((user) => (
                <MenuItem key={user.uid} value={user.uid}>
                  👤 {user.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />


        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Status"
              fullWidth
              margin="normal"
              error={!!errors.status}
              helperText={errors.status?.message}
              sx={darkField}
            >
              <MenuItem value="todo">
                <Chip label="Todo" size="small" color="primary" />
              </MenuItem>
              <MenuItem value="in-progress">
                <Chip label="In Progress" color="warning" size="small" />
              </MenuItem>
              <MenuItem value="done">
                <Chip label="Done" color="success" size="small" />
              </MenuItem>
            </TextField>
          )}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={submitForm(onSubmit)}
          sx={{
            borderRadius: 3,
            px: 4,
            textTransform: "none",
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          }}
        >
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
