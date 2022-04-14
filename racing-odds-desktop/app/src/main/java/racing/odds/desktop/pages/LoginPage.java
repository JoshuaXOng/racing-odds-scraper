package racing.odds.desktop.pages;

import com.esri.arcgisruntime.ArcGISRuntimeEnvironment;
import com.esri.arcgisruntime.mapping.ArcGISMap;
import com.esri.arcgisruntime.mapping.BasemapStyle;
import com.esri.arcgisruntime.mapping.Viewpoint;
import com.esri.arcgisruntime.mapping.view.MapView;

import io.github.cdimascio.dotenv.Dotenv;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.util.Pair;
import racing.odds.desktop.components.ContestantGraph;
import racing.odds.desktop.components.LoginForm;

public class LoginPage extends Scene {
  public LoginPage() {
    super(new VBox(20), 1280, 720);

    // ((VBox) this.getRoot()).setAlignment(Pos.CENTER);
    // ((VBox) this.getRoot()).getStyleClass().add("login-page");

    // VBox loginForm = new LoginForm(fields -> {});
    // ((VBox) this.getRoot()).getChildren().add(loginForm);

    // ContestantGraph contestantGraph = new ContestantGraph("Horsey");
    // contestantGraph.addSeries("betfair", "Betfair");
    // contestantGraph.addDatapointToSeries("betfair", new Pair<>(2, 2));
    // contestantGraph.addDatapointToSeries("betfair", new Pair<>(3, 6));
    // ((VBox) this.getRoot()).getChildren().add(contestantGraph);
    
    ArcGISRuntimeEnvironment.setApiKey(Dotenv.load().get("ARC_GIS_KEY"));

    MapView mv = new MapView();
    mv.setViewpoint(new Viewpoint(34.02700, -118.80543, 144447.638572));
    ArcGISMap map = new ArcGISMap(BasemapStyle.ARCGIS_TOPOGRAPHIC);
    mv.setMaxWidth(600);
    mv.setPrefHeight(600);
    mv.setMaxHeight(600);
    mv.setMap(map);
    ((VBox) this.getRoot()).getChildren().add(mv);
  }
}
