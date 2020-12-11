import echarts from "echarts";

const hexToRgba = (hex, opacity) => {
  let rgbaColor = "";
  let reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
      "0x" + hex.slice(3, 5)
    )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
};

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
      top: "top",
      data: legendData
    },
    series: [
      {
        name: "评价等级",
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
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
  let max = 1;
  data.forEach(item => {
    item.data.forEach(v => {
      max = Math.max(max, v.value * 1.2);
    });
  });
  data.forEach((item, index) => {
    let value = [];
    item.data.forEach(v => {
      value.push(v.value);
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
      data: (legend.length && legend) || ["10月份", "9月份", "8月份"]
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

export function getLineOptions(data, yAxisName) {
  if (!data || !data.length) {
    return {};
  }
  const color = [
    "#F4D458",
    "#51F8A8",
    "#8075FF",
    "#19B0AE",
    "#F6A93B",
    "#F19B78",
    "#4A90E2",
    "#80C16B"
  ];
  let xAxisData = [];
  let yAxisData = [];
  data.forEach((v, index) => {
    let yData = { name: v.communityName, data: [] };
    let itemData = v.data.reverse();
    itemData.forEach(item => {
      if (index === 0) {
        xAxisData.push(item.month + "月");
      }
      yData.data.push(item.value);
    });
    yAxisData.push(yData);
  });

  let series = [];
  yAxisData.forEach((v, index) => {
    series.push({
      name: v.name,
      type: "line",
      smooth: true,
      lineStyle: {
        normal: {
          color: color[index],
          shadowBlur: 3,
          shadowColor: hexToRgba(color[index], 0.5),
          shadowOffsetY: 8
        }
      },
      symbol: "circle",
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: hexToRgba(color[index], 0.3)
              },
              {
                offset: 1,
                color: hexToRgba(color[index], 0.1)
              }
            ],
            false
          ),
          shadowColor: hexToRgba(color[index], 0.1),
          shadowBlur: 10
        }
      },
      data: v.data
    });
  });

  return {
    color: color,
    legend: {
      top: 7
    },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      top: "40",
      right: "15",
      left: "40",
      bottom: "40"
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          textStyle: {
            color: "#333"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#D9D9D9"
          }
        },
        data: xAxisData
      }
    ],
    yAxis: [
      {
        type: "value",
        name: yAxisName,
        axisLabel: {
          formatter: "{value}",
          color: "#666"
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
      }
    ],
    series: series
  };
}

export function getLineBarOptions(data) {
  if (!data || !data.length) {
    return {};
  }
  const color = [
    "#F6A93B",
    "#8075FF",
    "#19B0AE",
    "#F19B78",
    "#4A90E2",
    "#80C16B"
  ];
  let legendData = [];
  let xAxisData = [];
  let series = [];
  data = data.reverse();
  data.forEach((v, index) => {
    v.data.forEach((item, i) => {
      if (index === 0) {
        legendData.push(item.name);
        series.push({
          name: item.name,
          type: "bar",
          stack: "案件数量",
          barWidth: "40%",
          data: []
        });
      }
      series[i].data.push(v.data[i].value);
    });
    xAxisData.push(v.month + "月");
  });
  return {
    color: color,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: legendData
    },
    grid: {
      top: "40",
      right: "15",
      left: "40",
      bottom: "40"
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          textStyle: {
            color: "#333"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#D9D9D9"
          }
        },
        data: xAxisData || [
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六",
          "周日"
        ]
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: series || [
      {
        name: "公共设施",
        type: "bar",
        stack: "案件数量",
        barWidth: "40%",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "治安管理",
        type: "bar",
        stack: "案件数量",
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: "消防管理",
        type: "bar",
        stack: "案件数量",
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };
}
