import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Task {
  id: string;
  title: string;
  textBody: string;
}

export interface TaskState {
  tasks: Task[];
  status: string;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  loading: false,
  error: null,
};

// ADD FETCH REQUESTS FOR JSON-SERVER HERE
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Task) => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }
);

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await fetch("http://localhost:3001/tasks");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to retrieve tasks.");
    }
  } catch (error) {
    throw new Error("Failed to retrieve tasks.");
  }
});

export const editTask = createAsyncThunk(
  "task/editTasks",
  async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        return updatedTask;
      } else {
        throw new Error("Failed to edit task.");
      }
    } catch (error) {
      throw new Error("Failed to edit task.");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTasks",
  async (taskId: string) => {
    console.log(taskId);

    await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    });
  }
);

// Dispatching
// export const checkExistingTasks = createAsyncThunk(
//   "task/checkExistingTasks",
//   async (task: Task) => {
//     console.log(task.id);
//     return await fetch(`http://localhost:3001/tasks/${task.id}`).then(
//       (response) => {
//         return JSON.stringify(response.json());
//       }
//     );
//   }
// );

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // add your reducers here.
  },

  // add your actions for fetch requests here.
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message || null : null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.status = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error ? action.error.message || null : null;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error ? action.error.message || null : null;
      });
  },
});

// put your actions in here
export const {} = taskSlice.actions;

// think of useSelector- but to get your task id.
export const selectTaskId = (state: RootState) =>
  state.task.tasks.map((task) => task.id);

export default taskSlice.reducer;
