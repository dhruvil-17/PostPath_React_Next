import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//get thunk
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const data = await res.json();
    return data;
  },
);
// fetch thunk
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (uid) => {
  const res = await fetch(`/api/tasks?uid=${uid}`);
  const data = await res.json();
  return data;
});

//delete thunk
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await fetch("/api/tasks", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return id;
});

//update thunk
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }) => {
    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, updates }),
    });

    return await res.json();
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.pending, (state, action) => {
        const id = action.meta.arg;
        state.tasks = state.tasks.filter((task) => task.id !== id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );

        if (index !== -1) {
          state.tasks[index] = {
            ...state.tasks[index],
            ...action.payload,
          };
        }
      });
  },
});

export default taskSlice.reducer;
