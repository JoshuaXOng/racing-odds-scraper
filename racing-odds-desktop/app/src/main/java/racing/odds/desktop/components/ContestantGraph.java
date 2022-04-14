package racing.odds.desktop.components;

import java.util.HashMap;

import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.util.Pair;

public class ContestantGraph extends LineChart<Number, Number> {
  HashMap<String, Series<Number, Number>> series = new HashMap<>();

  public ContestantGraph(String contestantName) {    
    super(new NumberAxis(), new NumberAxis());
    this.getXAxis().setLabel("Time");
    this.getYAxis().setLabel("Odds");
    this.setTitle(String.format("%s's Odds", contestantName));
  }

  public void addSeries(String key, String sourceName) {
    XYChart.Series<Number, Number> series = new XYChart.Series<>();
    series.setName(sourceName);
    this.getData().add(series);
    
    this.series.put(key, series);
  }

  public void addDatapointToSeries(String key, Pair<Number, Number> datapoint) {
    Series<Number, Number> targetSeries = series.get(key);

    if (targetSeries == null) 
      return;

    targetSeries.getData().add(new XYChart.Data<>(datapoint.getKey(), datapoint.getValue()));
  }
}
