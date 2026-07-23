import { customType } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { MultiPolygon } from "@/models/geojson/Geometry";

export const multiPolygon = customType<{ data: MultiPolygon; driverData: string }>({
  dataType() {
    return "geometry(MultiPolygon,4326)";
  },
  toDriver(value) {
    return sql`ST_GeomFromGeoJSON(${JSON.stringify(value)})`;
  },
  fromDriver(value) {
    return JSON.parse(value);
  },
});