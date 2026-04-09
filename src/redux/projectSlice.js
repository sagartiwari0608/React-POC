import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    setProjects: (_, action) => action.payload,
    addProject: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
