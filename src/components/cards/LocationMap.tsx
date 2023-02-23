import Map, { Marker, Popup, ScaleControl } from "react-map-gl";
import { useState, useRef, useMemo } from "react";
import Pin from "../pin";
import { RootArr } from "../../Providers/LocationsProvider";
import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { TiDirections } from "react-icons/ti";
import { RiMapPin5Line } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
const TOKEN =
  "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ";

export interface MapData {
  city?: string;
  population?: string;
  image?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
}

const LocationMap = (props: any): JSX.Element | null => {
  const [popupInfo, setPopupInfo] = useState<null | RootArr>();
  const resData = props.results as unknown as RootArr[];
  const map = useRef(null);
  const [isCurrLocation, setIsCurrentLocation] = useState("");
  const pins = useMemo(
    () =>
      resData.map((item: RootArr) => {
        return (
          <Marker
            key={`${item.id}`}
            longitude={item.rawData.cityCoordinate.longitude}
            latitude={item.rawData.cityCoordinate.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(item);
            }}
          >
            {item.id === isCurrLocation ? <Pin size={40} /> : <Pin />}
          </Marker>
        );
      }),
    [isCurrLocation, resData]
  );
  return (
    <Wrapper>
      <div className="resultsSection">
        {resData.map((item: RootArr) => {
          return (
            <div
              className="addressCard"
              key={item.id}
              onMouseOver={(e) => {
                e.preventDefault();
                setPopupInfo(item);
              }}
              onMouseOut={(e) => setPopupInfo(undefined)}
            >
              <div className="address">
                <div className="locationName">{item.rawData.name}</div>
                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: "0.5em" }}>
                    <GoLocation />
                  </span>
                  <span>
                    {item.rawData.address.city} | {item.rawData.address.region}{" "}
                    | {item.rawData.address.countryCode}
                  </span>
                </div>
              </div>
              <div className="distance">
                <TiDirections /> {Math.round(item.distance * 0.000621)}mi
              </div>
              <div className="directions">
                <RiMapPin5Line />
                Directions
              </div>
            </div>
          );
        })}
      </div>
      <div className="mapSection">
        <Map
          initialViewState={{
            latitude: 40,
            longitude: -100,
            zoom: 3,
            bearing: 0,
            pitch: 0,
          }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={TOKEN}
          style={{
            height: "calc(95%)",
            width: "100%",
          }}
        >
          <ScaleControl />
          {pins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.rawData.cityCoordinate.longitude)}
              latitude={Number(popupInfo.rawData.cityCoordinate.latitude)}
              onClose={() => setPopupInfo(undefined)}
            >
              <div>
                <h5>{popupInfo.rawData.name}</h5>
                <h6>
                  {popupInfo.rawData.address.city},
                  {popupInfo.rawData.address.region}
                </h6>

                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.foolcdn.com%2Fmedia%2Fdubs%2Fimages%2Fclothing_displayed_in_a_department_store_-_Gett.original.jpg&f=1&nofb=1"
                  alt=""
                />
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </Wrapper>
  );
};

export default LocationMap;
const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  gap: 1em;
  min-height: calc(95vh);

  .resultsSection {
    width: 35%;
    float: left;
  }

  .mapboxgl-canvas {
    height: 100% !imporant;
  }

  .mapSection {
    width: 65%;
    float: right;
  }
  .addressCard {
    display: flex;
    margin-bottom: 2em;
    padding: 0.5em;
    border: 1px solid;
    border-radius: 20px;
    padding-right: 1em;
    padding-left: 1em;
    padding-bottom: 0.5em;
    cursor: pointer;
  }
  .address {
    flex: 1;
  }

  svg {
    font-size: 1.5em;
    color: var(--clr-primary-5);
  }

  .distance svg,
  .directions svg {
    margin: 0 auto;
    margin-bottom: 0.5em;
  }
  .distance,
  .directions {
    flex: 0.3;
    text-align: center;
  }
  .locationName {
    font-weight: 400;
    font-size: 1.5em;
    margin-bottom: 0.1em;
  }

  .mapboxgl-popup-close-button {
    height: 2em;
    width: 2em;
    color: var(--clr-primary-5);
    font-size: 1.5em;
  }
  h5 {
    margin-bottom: 0em !important;
  }
  h6 {
    margin-bottom: 1em !important;
  }
`;
