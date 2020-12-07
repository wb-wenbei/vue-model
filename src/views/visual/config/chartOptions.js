export function getLinesChart(data) {
  let dimensions = ["name"];
  let source = [];
  data.forEach((item, index) => {
    let sourceData = { name: item.name };
    item.data.forEach(v => {
      if (index === 0) {
        dimensions.push(v.month + "月");
      }
      sourceData[v.month + "月"] = v.value;
    });
    source.push(sourceData);
  });
  const color = ["#F6A93B", "#7A95E5", "#50E3C2"];
  return {
    color: color,
    legend: {
      top: "10",
      textStyle: {
        color: "white"
      }
    },
    grid: {
      top: "40",
      right: "15",
      left: "40",
      bottom: "30"
    },
    tooltip: {},
    dataset: {
      dimensions: dimensions || ["name", "2015", "2016", "2017"],
      source: source || [
        { name: "虹桥小区", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
        { name: "名都小区", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
        { name: "红春小区", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
        { name: "龙腾小区", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
        { name: "龙腾小区1", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
        { name: "龙腾小区2", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
        { name: "龙腾小区3", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
        { name: "龙腾小区4", "2015": 72.4, "2016": 53.9, "2017": 39.1 }
      ]
    },
    xAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          color: "white"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#D9D9D9"
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      axisLabel: {
        color: "white"
      },
      // 分割线
      splitLine: {
        lineStyle: {
          color: "#E9E9E9"
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
  };
}

export function getPieChart(data) {
  if (!data || !data.length) {
    return {};
  }
  let legendData = [];
  data.forEach(v => {
    legendData.push(v.name);
  });
  const color = ["#4A90E2", "#7A95E5", "#50E3C2", "#F6A93B"];
  return {
    color: color,
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      top: "15%",
      right: "right",
      data: legendData,
      textStyle: {
        color: "white"
      }
    },
    series: [
      {
        name: "评价等级",
        type: "pie",
        radius: ["35%", "60%"],
        center: ["35%", "50%"],
        labelLine: {
          show: false
        },
        label: {
          show: false
        },
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
}

export function getRadarChart(data = []) {
  const color = ["#4A90E2", "#F6A93B", "#19B0AE"];
  let legend = [];
  let indicator = [];
  let seriesData = [];
  let max = 0;
  data.forEach((item, index) => {
    let value = [];
    item.data.forEach(v => {
      value.push(v.value);
      max = Math.max(max, v.value * 1.2);
      if (index === data.length - 1) {
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

  let options = {
    color: color,
    tooltip: {
      position: ["60%", "10%"]
    },
    legend: {
      bottom: 5,
      data: (legend.length && legend) || ["10月份", "9月份", "8月份"],
      textStyle: {
        color: "white"
      }
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
      indicator: (indicator.length && indicator) || [
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
        data: (seriesData.length && seriesData) || [
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
  return options;
}
