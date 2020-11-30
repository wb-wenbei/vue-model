export function getRadarChart(data) {
  if (!data || !data.length) {
    return {};
  }
  const color = ["#19B0AE", "#4A90E2", "#F6A93B"];
  let legend = [];
  let indicator = [];
  let seriesData = [];
  data.forEach((item, index) => {
    let value = [];
    let max = 0;
    item.data.forEach(v => {
      value.push(v.value);
      max = Math.max(max, v.value * 1.2);
      if (index === 0) {
        indicator.push({
          name: v.name,
          max
        });
      }
    });
    seriesData.push({
      name: item.month + "月份",
      value: value,
      areaStyle: {
        opacity: 0.2,
        color: color[index]
      }
    });
    legend.push(item.month + "月份");
  });

  return {
    color: color,
    tooltip: {
      position: ["60%", "10%"]
    },
    legend: {
      bottom: 5,
      data: legend || ["10月份", "9月份", "8月份"]
    },
    radar: {
      center: ["50%", "45%"],
      radius: "60%",
      axisLine: { show: false },
      splitArea: { show: false },
      splitLine: {
        lineStyle: {
          color: "rgba(69,185,182,0.4)"
        }
      },
      indicator: indicator || [
        { name: "生活服务" },
        { name: "消防管理" },
        { name: "治安管理" },
        { name: "公共设施" },
        { name: "人口管理" },
        { name: "车辆管理" }
      ]
    },
    series: [
      {
        type: "radar",
        data: seriesData || [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: "10月份"
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: "9月份"
          },
          {
            value: [4000, 12000, 25000, 38000, 52000, 16000],
            name: "8月份"
          }
        ]
      }
    ]
  };
}
