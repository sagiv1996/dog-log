<template>
  <UCard>
    <template #header
      ><UButton label="To add data" block size="xl" to="/dog"
    /></template>
    <div style="height: 500px">
      <VChart :option="chartOption" />
    </div>
    <template #footer>
      <UButton @click="refresh" :loading="status === 'pending'">
        Refresh
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { Tables } from "~/types/database.types";
type DogRow = Tables<"dog">;
type GraphViewRow = Tables<"graph_view">;
type TransformedEntry = {
  date: string;
  poop: { indoors: number; outdoors: number };
  pee: { indoors: number; outdoors: number };
};

const route = useRoute();
const { id } = route.query;
const { data, refresh, error, status } = await useFetch<DogRow>(
  `/api/graph/${id}`,
  {
    transform: (data) =>
      data.graph_view.reduce<TransformedEntry[]>(
        (acc: GraphViewRow[], curr: GraphViewRow) => {
          let entry = acc.find((item: GraphViewRow) => item.date === curr.date);
          if (!entry) {
            entry = {
              date: curr.date,
              poop: { indoors: 0, outdoors: 0 },
              pee: { indoors: 0, outdoors: 0 },
            };
            acc.push(entry);
          }

          if (curr.type === "poop") {
            entry.poop[curr.location] += curr.count;
          } else if (curr.type === "pee") {
            entry.pee[curr.location] += curr.count;
          }

          return acc;
        },
        []
      ),
  }
);

const chartOption = ref({
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: [
      "poop_indoors",
      "poop_outdoors",
      "pee_indoors",
      "pee_outdoors",
      "poop_line",
    ],
  },
  xAxis: {
    type: "category",
    data: data.value?.map((item: GraphViewRow) => item.date),
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
      data: data.value?.map((item: GraphViewRow) => item.poop.indoors),
      itemStyle: {
        color: "#8B0000",
      },
    },
    {
      name: "poop_outdoors",
      type: "bar",
      stack: "poop",
      data: data.value?.map((item: GraphViewRow) => item.poop.outdoors),
      itemStyle: {
        color: "#bf8888",
      },
    },
    {
      name: "pee_indoors",
      type: "bar",
      stack: "pee",
      data: data.value?.map((item: GraphViewRow) => item.pee.indoors),
      itemStyle: {
        color: "#f2b957",
      },
    },
    {
      name: "pee_outdoors",
      type: "bar",
      stack: "pee",
      data: data.value?.map((item: GraphViewRow) => item.pee.outdoors),
      itemStyle: {
        color: "#e8c992",
      },
    },
    {
      name: "poop_line",
      type: "line",
      data: data.value?.map(
        (item: GraphViewRow) => item.pee.indoors + item.poop.indoors
      ),
      itemStyle: {
        color: "#57f290",
      },
      lineStyle: {
        width: 5,
      },
    },
  ],
});
</script>
