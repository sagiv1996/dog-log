<template>
  <VChart
    :option="graphOption"
    :init-options="{ height: '500', width: 'auto', locale: locale }"
    :theme="colorMode.value"
  />
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
const { t, locale } = useI18n();

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
  const isRtl = locale.value === "he";
  return {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { type: ["line", "bar"] },
      },
      left: isRtl ? "left" : "right",
    },
    legend: {
      data: [
        t("poopIndoors"),
        t("poopOutdoors"),
        t("peeIndoors"),
        t("peeOutdoors"),
      ],
      selected: {
        [t("poopIndoors")]: false,
        [t("peeIndoors")]: false,
      },
      left: isRtl ? "right" : "left",
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
        name: t("poopIndoors"),
        type: "line",
        stack: "poop",
        data: transData.map((item: GraphViewRow) => item.poop.indoors),
        itemStyle: {
          color: "#8B0000",
        },
      },
      {
        name: t("poopOutdoors"),
        type: "line",
        stack: "poop",
        data: transData.map((item: GraphViewRow) => item.poop.outdoors),
        itemStyle: {
          color: "#bf8888",
        },
      },
      {
        name: t("peeIndoors"),
        type: "line",
        stack: "pee",
        data: transData.map((item: GraphViewRow) => item.pee.indoors),
        itemStyle: {
          color: "#f2b957",
        },
      },
      {
        name: t("peeOutdoors"),
        type: "line",
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
