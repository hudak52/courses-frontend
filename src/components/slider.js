import React, { Fragment } from 'react'

const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 42,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
  // border: '1px solid white',
}

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: 'rgb(155,155,155)',
}

export function SliderRail({ getRailProps }) {
  return (
    <Fragment>
    <div style={railOuterStyle} {...getRailProps()} />
    <div style={railInnerStyle} />
    </Fragment>
  )
}

export function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <Fragment>
    <div
    style={{
      left: `${percent}%`,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      zIndex: 5,
      width: 28,
      height: 42,
      cursor: 'pointer',
      // border: '1px solid white',
      backgroundColor: 'none',
    }}
    {...getHandleProps(id)}
    />
    <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
      width: 24,
      height: 24,
      borderRadius: '50%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
      backgroundColor: disabled ? '#666' : '#d6ebf2',
    }}
    />
    </Fragment>
  )
}


export function KeyboardHandle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
  }) {
  return (
    <button
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
      width: 24,
      height: 24,
      borderRadius: '50%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
      backgroundColor: disabled ? '#666' : '#d6ebf2',
    }}
    {...getHandleProps(id)}
    />
  )
}

export function Track({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : '#e6f3f7',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}
