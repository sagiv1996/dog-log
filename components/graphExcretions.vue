<template>
  <div style="height: 50vh">
    <VChart :option="graphOption" :theme="colorMode.value" />
  </div>
</template>
<script lang="ts" setup>
import type { Tables } from "~/types/database.types";

type GraphViewRow = Tables["graph_view"];

type TransformedEntry = {
  date: string;
  poop: { indoors: number; outdoors: number };
  pee: { indoors: number; outdoors: number };
};

const { graphData } = defineProps<{
  graphData: GraphViewRow[];
}>();
const colorMode = useColorMode();

const transformData = () => {
  return graphData.reduce<TransformedEntry[]>((acc, curr) => {
    let entry = acc.find((item) => item.date === curr.date);
    if (!entry) {
      entry = {
        date: curr.date,
        poop: { indoors: 0, outdoors: 0 },
        pee: { indoors: 0, outdoors: 0 },
      };
      acc.push(entry);
    }

    if (curr.type === "poop") {
      entry.poop[curr.location as "indoors" | "outdoors"] += curr.count;
    } else if (curr.type === "pee") {
      entry.pee[curr.location as "indoors" | "outdoors"] += curr.count;
    }

    return acc;
  }, []);
};
const graphOption = computed(() => {
  const transData = transformData();
  return {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      data: [
        "poop indoors",
        "poop outdoors",
        "pee indoors",
        "pee outdoors",
        "Poop and Pee Distribution",
      ],
      selected: {
        "poop outdoors": false,
        "pee outdoors": false,
      },
    },
    xAxis: {
      type: "category",
      data: transData.map((item: GraphViewRow) => item.date),
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "slider",
      },
      {
        type: "inside",
      },
    ],
    series: [
      {
        name: "poop indoors",
        type: "line",
        stack: "poop",
        data: transData.map((item: GraphViewRow) => item.poop.indoors),
        itemStyle: {
          color: "#8B0000",
        },
      },
      {
        name: "poop outdoors",
        type: "line",
        stack: "poop",
        data: transData.map((item: GraphViewRow) => item.poop.outdoors),
        itemStyle: {
          color: "#bf8888",
        },
      },
      {
        name: "pee indoors",
        type: "line",
        stack: "pee",
        data: transData.map((item: GraphViewRow) => item.pee.indoors),
        itemStyle: {
          color: "#f2b957",
        },
      },
      {
        name: "pee outdoors",
        type: "line",
        stack: "pee",
        data: transData.map((item: GraphViewRow) => item.pee.outdoors),
        itemStyle: {
          color: "#e8c992",
        },
      },
      {
        name: "Poop and Pee Distribution",
        type: "pie",
        center: ["85%", "30%"],
        radius: "20%",
        data: [
          {
            value: transData.reduce((sum, item) => sum + item.poop.indoors, 0),
            name: "poop indoors",
          },
          {
            value: transData.reduce((sum, item) => sum + item.poop.outdoors, 0),
            name: "poop outdoors",
          },
          {
            value: transData.reduce((sum, item) => sum + item.pee.indoors, 0),
            name: "pee indoors",
          },
          {
            value: transData.reduce((sum, item) => sum + item.pee.outdoors, 0),
            name: "pee outdoors",
          },
        ],
        itemStyle: {
          color: function (params: {
            name:
              | "poop indoors"
              | "poop outdoors"
              | "pee indoors"
              | "pee outdoors";
          }): string {
            const colorMap = {
              "poop indoors": "#8B0000",
              "poop outdoors": "#bf8888",
              "pee indoors": "#f2b957",
              "pee outdoors": "#e8c992",
            };
            return colorMap[params.name];
          },
        },
      },
    ],
  };
});
</script>
