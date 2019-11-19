import { Component, AfterViewInit, OnDestroy} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { rgb } from '@amcharts/amcharts4/.internal/core/utils/Colors';

@Component({
  selector: "section1",
  templateUrl: "section1.component.html",
  styleUrls: ["./section1.component.scss"]
})

export class Section1Component implements AfterViewInit, OnDestroy {
    
  constructor() {}

  charts = [];

  initGaugeCharts() {
    for ( let i = 0; i < 5; ++ i) {
      // create chart
      var chart = am4core.create(" chartdiv_" + i, am4charts.GaugeChart);

      this.charts.push( chart);

      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

      chart.innerRadius = -25;

      var axis = chart.xAxes.push( new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.disabled = true;
      axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
      axis.renderer.grid.template.strokeOpacity = 0;
      axis.renderer.labels.template.fontSize = 10;
      axis.renderer.labels.template.radius = 2;

      for ( let i = 0; i <= 100; i += 25)
      {
        var range = axis.axisRanges.create();
        range.value = i;
        range.label.text = "{value}%";
      }

      var colorSet = new am4core.ColorSet();

      var range0 = axis.axisRanges.create();
      range0.value = 0;
      range0.endValue = 50;
      range0.axisFill.fillOpacity = 1;
      range0.axisFill.fill = am4core.color( "rgb( 252, 111, 117)");
      range0.axisFill.zIndex = - 1;

      var range1 = axis.axisRanges.create();
      range1.value = 50;
      range1.endValue = 75;
      range1.axisFill.fillOpacity = 1;
      range1.axisFill.fill = am4core.color( "rgb( 253, 194, 90)");
      range1.axisFill.zIndex = -1;

      var range2 = axis.axisRanges.create();
      range2.value = 75;
      range2.endValue = 100;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color( "rgb( 82, 182, 146)");
      range2.axisFill.zIndex = -1;

      var value = (Math.random() * 100).toFixed(0);
      var hand = chart.hands.push(new am4charts.ClockHand());
      
      hand.innerRadius = am4core.percent( 30);
      hand.pin.disabled = true;
      hand.value = parseInt( value);

      var label = chart.radarContainer.createChild(am4core.Label);
      label.isMeasured = false;
      label.fontSize = 12;
      label.x = am4core.percent(50);
      label.y = am4core.percent(100);
      label.horizontalCenter = "middle";
      label.verticalCenter = "bottom";
      label.text = value + "%";
    }
  }

  initPieCharts() {

    for ( let i = 1; i <= 2; ++ i) {
      var chart = am4core.create("pie_chart_" + i, am4charts.PieChart);

      this.charts.push( chart);

      // Add data
      chart.data = [{
        "country": "Item 1",
        "litres": 501.9
      }, {
        "country": "Item 2",
        "litres": 301.9
      }, {
        "country": "Item 3",
        "litres": 201.1
      }, {
        "country": "Item 4",
        "litres": 165.8
      }, {
        "country": "Item 5",
        "litres": 139.9
      }];
      
      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      chart.legend = new am4charts.Legend();
      chart.legend.fontSize = 10;
      chart.legend.position = "left";
      chart.legend.width = 40;
      chart.legend.valueLabels.template.text = "";
      //chart.legend.itemContainers.template.paddingLeft = -30;

      var markerTemplate = chart.legend.markers.template;

      markerTemplate.width = 10;
      markerTemplate.height = 10;
      //marker.cornerRadius(12, 12, 12, 12);

      if ( 1 == i) {
        pieSeries.colors.list = [
          am4core.color( "rgb(68,115,197)"),
          am4core.color( "rgb(237,125,49)"),
          am4core.color( "rgb(165,175,185)"),
          am4core.color( "rgb(254,202,5)"),
          am4core.color( "rgb(90,155,213)")
        ];
      } else {
        pieSeries.colors.list = [
          am4core.color( "rgba(85,129,50,.4)"),
          am4core.color( "rgba(85,129,50,.55)"),
          am4core.color( "rgba(85,129,50,.7)"),
          am4core.color( "rgba(85,129,50,.85)"),
          am4core.color( "rgba(85,129,50,1.0)")
        ];
      }
    }
  }

  initStackedChart() {
    var chart = am4core.create("stacked_chart", am4charts.XYChart);

    this.charts.push( chart);
    
    // Add data
    chart.data = [{
      "country": "Item 1",
      "Critical": 501.9,
      "High": 250,
      "Medium": 199
    }, {
      "country": "Item 2",
      "Critical": 301.9,
      "High": 222,
      "Medium": 251
    }, {
      "country": "Item 3",
      "Critical": 201.1,
      "High": 170,
      "Medium": 199
    }, {
      "country": "Item 4",
      "Critical": 165.8,
      "High": 122,
      "Medium": 90
    }];
    
    //console.log('chart', chart);
    
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.fontSize = 10;
    
    
    var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.renderer.fontSize = 10;
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "Critical";
    series.dataFields.categoryX = "country";
    series.name = "Critical";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = true;
    
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "High";
    series2.dataFields.categoryX = "country";
    series2.name = "High";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.stacked = true;
    
    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "Medium";
    series3.dataFields.categoryX = "country";
    series3.name = "Medium";
    series3.tooltipText = "{name}: [bold]{valueY}[/]";
    series3.stacked = true;
    
    // Add cursor
    //chart.cursor = new am4charts.XYCursor();

    chart.legend = new am4charts.Legend();
    chart.legend.position = "absolute";
    chart.legend.x = 100;
    chart.legend.labels.template.fontSize = 10;

    // Marker

    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 10;
    markerTemplate.height = 10;
  }


  initChart() {
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    this.initGaugeCharts();
    this.initPieCharts();
    this.initStackedChart();
  }

  ngOnDestroy() {
      this.charts.forEach(chart => {
          chart.dispose();
      });
  }

  ngAfterViewInit() {
    this.initChart();
  }
}
