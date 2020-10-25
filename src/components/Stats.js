import React from "react";
import "./styles.scss";
import { VictoryPie, VictoryLabel } from "victory";

function Stats({ data }) {
  return (
    <div className="stats">
      <h4>Property Type</h4>
      <VictoryPie
        data={data}
        height={250}
        // colorScale={["#5e74db", "#64B7F1", "#00B7D7", "#E8E8E8", "#FAFAFA"]}
        style={{ labels: { fill: "white", fontSize: 8, fontWeight: "bold" } }}
        labels={({ datum }) => datum.x}
        labelRadius={({ innerRadius }) => innerRadius + 20}
        padding={20}
        labelPlacement={({ index }) => (index ? "parallel" : "vertical")}
      />
    </div>
  );
}

export default Stats;
