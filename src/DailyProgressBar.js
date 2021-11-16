import React from "react";

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: '-10 -10 70 70',
  x: '17',
  y: '17',
  radio: '15.91549430918954'
};

const CircleProgressBarBase = ({
  className,
  trailStrokeColor,
  strokeColor,
  percentage,
  }) => {
    return (
        <figure className={className}>
            <svg viewBox={circleConfig.viewBox}>
                <circle
                    className="ring"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    stroke={trailStrokeColor}
                    strokeWidth="7"
                />

                <circle
                    className="path"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeDasharray={`${percentage} ${100 - percentage}`}
                    strokeDashoffset={INITIAL_OFFSET}
                    strokeWidth="10"
                />
                <g className="circle-label">
                    <text 
                        x="16%"
                        y="27%" 
                        className="circle-percentage">
                        {percentage}%
                    </text>
                </g> 
            </svg>
        </figure>
    );
};

export default CircleProgressBarBase;