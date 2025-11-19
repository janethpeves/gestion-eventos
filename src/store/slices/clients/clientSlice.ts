import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Client {
  id: string;
  email: string;
  nombre: string;
}

interface Event {
  nombre: string;
  detalle: string;
  ubicacion?: string;
  fecha: string;
  hora?: string;
}

interface ClientProps {
  client: Client | null;
  event: Event | null;
}

const initialState: ClientProps[] = [];

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<ClientProps>) => {
      state.push(action.payload);
    },
    clearClient: (state, action: PayloadAction<ClientProps>) => {
      return state.filter(
        (item) => item.client?.id !== action.payload.client?.id,
      );
    },
  },
});

export const { setClient, clearClient } = clientSlice.actions;

export default clientSlice.reducer;
