// Mock data for units a manager can operate. A "unit" is the entity a
// manager runs — it can be one of four Clubers categories.

export type UnitType = "place" | "experience" | "event" | "community";

export interface ManagedUnit {
  id: string;
  type: UnitType;
  name: string;
  address: string;
  city: string;
  emoji: string;
}

export const UNIT_TYPE_META: Record<UnitType, { label: string; plural: string; hint: string }> = {
  place:      { label: "Place",      plural: "Places",      hint: "Restaurant, bar, rooftop, club" },
  experience: { label: "Experience", plural: "Experiences", hint: "Tasting, workshop, guided activity" },
  event:      { label: "Event",      plural: "Events",      hint: "Concert, pop-up, one-off night" },
  community:  { label: "Community",  plural: "Communities", hint: "Members club, school, group" },
};

// Mock — what the logged-in manager already operates.
export const MY_UNITS: ManagedUnit[] = [
  {
    id: "cosmo-san-pedro",
    type: "place",
    name: "Cosmo San Pedro",
    address: "Río Orinoco 106, Del Valle, 66250",
    city: "San Pedro Garza García",
    emoji: "🌃",
  },
  {
    id: "lazaro-diego",
    type: "place",
    name: "Lázaro & Diego",
    address: "Eje Metropolitano 10 2400, Zona Loma Larga",
    city: "San Pedro Garza García",
    emoji: "🍷",
  },
  {
    id: "cata-mezcal",
    type: "experience",
    name: "Cata de Mezcal con maestro",
    address: "Barrio Antiguo · Calle Padre Mier 200",
    city: "Monterrey",
    emoji: "🥃",
  },
  {
    id: "palnorte-2026",
    type: "event",
    name: "Pa'l Norte 2026",
    address: "Parque Fundidora · Av. Fundidora",
    city: "Monterrey",
    emoji: "🎪",
  },
  {
    id: "rooftop-society",
    type: "community",
    name: "Rooftop Society MTY",
    address: "Members-only · San Pedro",
    city: "San Pedro Garza García",
    emoji: "🌆",
  },
];

export function findUnit(type: UnitType, id: string): ManagedUnit | undefined {
  return MY_UNITS.find((u) => u.id === id && u.type === type);
}