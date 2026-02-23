"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

export default function AdminPanelDialog({
  open,
  handleClose,
  users,
  tasks,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Admin Panel</DialogTitle>

      <DialogContent>

        {/* Users Section */}
        <Typography variant="h6" gutterBottom>
          Users
        </Typography>

        {users.map((user) => (
          <div
            key={user.uid}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <div>
              <Typography>{user.name}</Typography>
              <Typography variant="caption">
                {user.email}
              </Typography>
            </div>

            <Chip label={user.role} size="small" />
          </div>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* Analytics Section */}
        <Typography variant="h6" gutterBottom>
          Task Analytics
        </Typography>

        <Typography>Total Tasks: {tasks.length}</Typography>
        <Typography>
          Completed: {tasks.filter(t => t.status === "done").length}
        </Typography>
        <Typography>
          Pending: {tasks.filter(t => t.status !== "done").length}
        </Typography>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}