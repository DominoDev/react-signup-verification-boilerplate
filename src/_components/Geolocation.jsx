import React from 'react';
import useGeolocation from "../_helpers/useGeolocation.js"

function Geolocation() {
  const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation()

  return (
    <>
      <div>Loading: {loading.toString()}</div>
      <div>Error: {error?.message}</div>
      <div>
        {latitude} x {longitude}
      </div>
    </>
  )
}

export { Geolocation };