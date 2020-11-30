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

export function getPieChart() {
  const color = ["#4A90E2", "#7A95E5", "#50E3C2", "#F6A93B"];
  return {
    color: color,
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      top: "top",
      data: ["优秀", "中等", "差"]
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
        data: [
          { value: 335, name: "优秀" },
          { value: 310, name: "中等" },
          { value: 234, name: "差" }
        ],
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

export function getLineOptions(options) {
  if (!options) {
    options = {
      color: ["#F4D458", "#51F8A8"],
      yAxisName: "评分",
      xAxisData: ["1", "2", "3", "4", "5", "6", "7", "8"],
      yAxisData: [
        { name: "虹桥社区", data: [100, 138, 350, 173, 180, 150, 180, 230] },
        {
          name: "金龙小区",
          data: [233, 233, 200, 180, 199, 233, 210, 180]
        }
      ]
    };
  }

  let series = [];
  options.yAxisData.forEach((v, index) => {
    series.push({
      name: v.name,
      type: "line",
      smooth: true,
      lineStyle: {
        normal: {
          color: options.color[index],
          shadowBlur: 3,
          shadowColor: hexToRgba(options.color[0], 0.5),
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
                color: hexToRgba(options.color[0], 0.3)
              },
              {
                offset: 1,
                color: hexToRgba(options.color[0], 0.1)
              }
            ],
            false
          ),
          shadowColor: hexToRgba(options.color[0], 0.1),
          shadowBlur: 10
        }
      },
      data: v.data
    });
  });

  return {
    color: options.color,
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
        data: options.xAxisData
      }
    ],
    yAxis: [
      {
        type: "value",
        name: options.yAxisName,
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

export function getLineBarOptions() {
  const color = [
    "#F6A93B",
    "#8075FF",
    "#19B0AE",
    "#F19B78",
    "#4A90E2",
    "#80C16B"
  ];
  return {
    color: color,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: ["公共设施", "治安管理", "消防管理"]
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
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
    series: [
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
