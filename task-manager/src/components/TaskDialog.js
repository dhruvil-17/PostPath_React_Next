"use client";

import { useEffect } from "react";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function TaskDialog({
  open,
  handleClose,
  handleSubmit,
  initialData,
  users,
}) {
  const {
    control,
    handleSubmit: submitForm,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      assignedTo: "",
      assignedBy: "",
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

  const onSubmit = (data) => {
    handleSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{initialData ? "Edit Task" : "Add Task"}</DialogTitle>

      <DialogContent>
        
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
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
              label="Description"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="600">
          Assign Task To
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
            >
              <MenuItem value="">Unassigned</MenuItem>
              {users?.map((user) => (
                <MenuItem key={user.uid} value={user.uid}>
                  {user.name}
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
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={submitForm(onSubmit)}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}