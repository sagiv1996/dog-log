<template>
  <div style="height: 40vh">
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
    backgroundColor: null,
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
      data: ["poop_indoors", "poop_outdoors", "pee_indoors", "pee_outdoors"],
      selected: {
        poop_outdoors: false,
        pee_outdoors: false,
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
        name: "poop_indoors",
        type: "bar",
        stack: "poop",
        data: transData.map((item: GraphViewRow) => item.poop.indoors),
        itemStyle: {
          color: "#8B0000",
        },
      },
      {
        name: "poop_outdoors",
        type: "bar",
        stack: "poop",
        data: transData.map((item: GraphViewRow) => item.poop.outdoors),
        itemStyle: {
          color: "#bf8888",
        },
      },
      {
        name: "pee_indoors",
        type: "bar",
        stack: "pee",
        data: transData.map((item: GraphViewRow) => item.pee.indoors),
        itemStyle: {
          color: "#f2b957",
        },
      },
      {
        name: "pee_outdoors",
        type: "bar",
        stack: "pee",
        data: transData.map((item: GraphViewRow) => item.pee.outdoors),
        itemStyle: {
          color: "#e8c992",
        },
      },
    ],
  };
});
</script>
