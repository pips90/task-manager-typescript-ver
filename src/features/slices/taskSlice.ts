import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Task {
  id: string;
  title: string;
  textBody: string;
}

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

// ADD FETCH REQUESTS FOR JSON-SERVER HERE

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // add your reducers here.
  },
  extraReducers: {
    // add your actions for fetch requests here.
  },
});

// put your actions in here
export const {} = taskSlice.actions;

// think of useSelector- but to get your task id.
export const selectTaskId = (state: RootState) =>
  state.task.tasks.map((task) => task.id);

export default taskSlice.reducer;
