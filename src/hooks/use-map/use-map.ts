import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Location } from '../../types/offers';
import { Map, TileLayer } from 'leaflet';
import { COPYRIGHT, TITLE_LAYER } from '../../const';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  location: Location;
};

function useMap({ mapRef, location }: UseMapProps) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const layer = new TileLayer(TITLE_LAYER, {
        attribution: COPYRIGHT,
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}

export default useMap;
