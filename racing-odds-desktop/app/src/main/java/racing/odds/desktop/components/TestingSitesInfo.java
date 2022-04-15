package racing.odds.desktop.components;

import java.util.ArrayList;

import com.esri.arcgisruntime.ArcGISRuntimeEnvironment;
import com.esri.arcgisruntime.mapping.ArcGISMap;
import com.esri.arcgisruntime.mapping.BasemapStyle;
import com.esri.arcgisruntime.mapping.Viewpoint;
import com.esri.arcgisruntime.mapping.view.MapView;

import io.github.cdimascio.dotenv.Dotenv;
import javafx.geometry.Pos;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import racing.odds.desktop.services.DemoAPI;

public class TestingSitesInfo extends VBox {
  public TestingSitesInfo() {
    super(20);
    this.setAlignment(Pos.CENTER);

    ArcGISRuntimeEnvironment.setApiKey(Dotenv.load().get("ARC_GIS_KEY"));
    MapView mv = new MapView();
    mv.setPrefHeight(600);
    ArcGISMap map = new ArcGISMap(BasemapStyle.ARCGIS_COMMUNITY);
    mv.setMap(map);
    mv.setViewpoint(new Viewpoint(-37.8136, 147.9631, 14444000));
    this.getChildren().add(mv);

    try {
      ArrayList<DemoAPI.TestingSiteResponseBody> a = DemoAPI.getTestingSites().join();
      Text title = new Text(a.toString());
      this.getChildren().add(title);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}
