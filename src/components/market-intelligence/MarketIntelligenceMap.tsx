"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  type MapLayerMouseEvent,
  type MapRef,
} from "react-map-gl";
import type { Expression } from "mapbox-gl";
import mapboxgl from "mapbox-gl";

import {
  countryByCode,
  formatMetricValue,
  formatNumber,
  formatShare,
  getDisplayCountry,
  getFlagEmoji,
  metricDefinitions,
  type CountrySummaryRow,
  type MetricOption,
} from "@/lib/market-intelligence";
import { cn } from "@/lib/utils";

const EMPTY_COLOR = "#e5e7eb";
const COLOR_SCALE = ["#d9e6ff", "#b5cbff", "#8db0ff", "#5f93ff", "#2b75ff"];

const GLOBAL_VIEW = {
  longitude: 10,
  latitude: 20,
  zoom: 1.35,
};

const SOURCE_ID = "country-boundaries";
const SOURCE_LAYER = "country_boundaries";

const fillLayer: Omit<Layer, "paint"> = {
  id: "country-fills",
  type: "fill",
  source: SOURCE_ID,
  "source-layer": SOURCE_LAYER,
};

const highlightLayer: Omit<Layer, "paint" | "filter"> = {
  id: "country-highlight",
  type: "line",
  source: SOURCE_ID,
  "source-layer": SOURCE_LAYER,
};

type HoverInfo = {
  longitude: number;
  latitude: number;
  countryCode: string;
};

type Props = {
  data: CountrySummaryRow[];
  metric: MetricOption;
  selectedCountry?: string | null;
  onSelectCountry: (countryCode: string) => void;
  onResetView: () => void;
  isLoading?: boolean;
};

export default function MarketIntelligenceMap({
  data,
  metric,
  selectedCountry,
  onSelectCountry,
  onResetView,
  isLoading,
}: Props) {
  const mapRef = useRef<MapRef>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const metricByCountry = useMemo(() => {
    return new Map(data.map((row) => [row.countryCode, row]));
  }, [data]);

  const { colorExpression, colorScale } = useMemo(() => {
    const values = data.map((row) => row.total).filter((value) => value > 0);
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 0);
    const colorMap = new Map<string, string>();

    data.forEach((row) => {
      if (!row.total || max <= min) {
        colorMap.set(row.countryCode, COLOR_SCALE[0]);
        return;
      }
      const ratio = (row.total - min) / (max - min);
      const index = Math.min(
        COLOR_SCALE.length - 1,
        Math.floor(ratio * COLOR_SCALE.length)
      );
      colorMap.set(row.countryCode, COLOR_SCALE[index]);
    });

    const matchExpression: unknown[] = [
      "match",
      [
        "coalesce",
        ["get", "iso_3166_1_alpha_2"],
        ["get", "iso_3166_1"],
        ["get", "iso_3166_1_alpha_3"],
      ],
    ];

    colorMap.forEach((color, code) => {
      matchExpression.push(code, color);
    });

    matchExpression.push(EMPTY_COLOR);

    return {
      colorExpression: matchExpression as unknown as Expression,
      colorScale: COLOR_SCALE,
    };
  }, [data]);

  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    const layers = map.getStyle().layers ?? [];
    layers.forEach((layer) => {
      if (layer.type === "symbol") {
        map.setLayoutProperty(layer.id, "visibility", "none");
      }
    });
    if (selectedMeta) {
      map.flyTo({
        center: [selectedMeta.lng, selectedMeta.lat],
        zoom: 3.2,
        duration: 700,
      });
    }
  }, [selectedMeta]);

  const handleHover = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    const code = feature?.properties?.iso_3166_1_alpha_2 || feature?.properties?.iso_3166_1;
    if (!code) {
      setHoverInfo(null);
      return;
    }
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countryCode: code,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setHoverInfo(null), []);

  const handleClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      const code = feature?.properties?.iso_3166_1_alpha_2 || feature?.properties?.iso_3166_1;
      if (!code) return;
      onSelectCountry(code);
    },
    [onSelectCountry]
  );

  const selectedMeta = selectedCountry ? getDisplayCountry(selectedCountry) : null;

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    if (selectedMeta) {
      map.flyTo({
        center: [selectedMeta.lng, selectedMeta.lat],
        zoom: 3.2,
        duration: 900,
      });
      return;
    }
    map.flyTo({
      center: [GLOBAL_VIEW.longitude, GLOBAL_VIEW.latitude],
      zoom: GLOBAL_VIEW.zoom,
      duration: 700,
    });
  }, [selectedMeta]);

  if (!mapboxToken) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
        <div className="max-w-md text-center">
          <p className="font-medium text-foreground">Mapbox token required</p>
          <p className="mt-2 text-muted-foreground">
            Add NEXT_PUBLIC_MAPBOX_TOKEN to your environment to enable the
            choropleth map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "h-[420px] w-full overflow-hidden rounded-xl border border-border",
          isLoading && "animate-pulse bg-muted/20"
        )}
      >
        {!isLoading && (
          <Map
            ref={mapRef}
            mapLib={mapboxgl}
            mapboxAccessToken={mapboxToken}
            initialViewState={GLOBAL_VIEW}
            onLoad={handleLoad}
            onMouseMove={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            mapStyle="mapbox://styles/mapbox/light-v11"
            interactiveLayerIds={[fillLayer.id as string]}
            projection={{ name: "mercator" }}
          >
            <Source
              id={SOURCE_ID}
              type="vector"
              url="mapbox://mapbox.country-boundaries-v1"
            >
              <Layer
                {...fillLayer}
                paint={{
                  "fill-color": colorExpression,
                  "fill-opacity": 1,
                  "fill-outline-color": "rgba(0,0,0,0.08)",
                }}
              />
              {selectedCountry && (
                <Layer
                  {...highlightLayer}
                  filter={[
                    "==",
                    [
                      "coalesce",
                      ["get", "iso_3166_1_alpha_2"],
                      ["get", "iso_3166_1"],
                      ["get", "iso_3166_1_alpha_3"],
                    ],
                    selectedCountry,
                  ]}
                  paint={{
                    "line-color": "rgba(15, 23, 42, 0.6)",
                    "line-width": 1.2,
                  }}
                />
              )}
            </Source>
            <NavigationControl position="bottom-right" showCompass={false} />

            {hoverInfo && (
              <Popup
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                className="market-tooltip"
                anchor="bottom"
                offset={12}
              >
                <div className="rounded-lg border border-border bg-background/95 p-3 text-xs text-foreground shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-lg">
                      {getFlagEmoji(hoverInfo.countryCode)}
                    </span>
                    <span>
                      {(countryByCode.get(hoverInfo.countryCode)?.name ??
                        hoverInfo.countryCode) +
                        " - " +
                        hoverInfo.countryCode}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-muted-foreground">
                    <div className="flex items-center justify-between gap-4">
                      <span>{metricDefinitions[metric].label}</span>
                      <span className="font-medium text-foreground">
                        {formatMetricValue(
                          metric,
                          metricByCountry.get(hoverInfo.countryCode)?.total ?? 0
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Global share</span>
                      <span className="font-medium text-foreground">
                        {formatShare(
                          metricByCountry.get(hoverInfo.countryCode)?.share ??
                            0
                        )}
                      </span>
                    </div>
                    {metric !== "importers" && (
                      <div className="flex items-center justify-between gap-4">
                        <span>#Importers</span>
                        <span className="font-medium text-foreground">
                          {formatNumber(
                            metricByCountry.get(hoverInfo.countryCode)
                              ?.importersCount ?? 0
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="rounded-full border border-border bg-background/90 px-3 py-1">
          Low - High
        </div>
        <div className="flex items-center gap-1">
          {colorScale.map((color) => (
            <span
              key={color}
              className="h-2.5 w-6 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="rounded-full border border-border bg-background/90 px-3 py-1">
          {metricDefinitions[metric].label}
        </div>
      </div>

      <button
        type="button"
        onClick={onResetView}
        className="absolute right-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm"
      >
        Reset view
      </button>
    </div>
  );
}
