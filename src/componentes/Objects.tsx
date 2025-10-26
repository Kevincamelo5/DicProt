export interface MyObject {
  id: number;
  name: string;
  position?: { x: number; y: number }; // Nueva propiedad
  type: "caso" | "actor";
}

export interface Caso extends MyObject {
  description?: string;
  vision: string;
  isUniqueView: boolean;
  relaciones: { targetId: number; text: string }[];
}

export interface Actor extends MyObject {
  relaciones: { targetId: number; text: string }[];
}
