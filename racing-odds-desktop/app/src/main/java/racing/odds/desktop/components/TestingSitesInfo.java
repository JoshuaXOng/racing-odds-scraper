package racing.odds.desktop.components;

import java.util.ArrayList;
import javafx.geometry.Pos;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import racing.odds.desktop.services.DemoAPI;

public class TestingSitesInfo extends VBox {
  public TestingSitesInfo() {
    super(20);
    this.setAlignment(Pos.CENTER);

    HBox controls = new HBox(20);
    controls.setMaxWidth(600);
    controls.setAlignment(Pos.CENTER);
    LabelledTextInput suburbNameInput = new LabelledTextInput("Suburb", "Suburb", (e) -> {});
    controls.getChildren().add(suburbNameInput);
    LabelledDropDownInput siteTypeInput = new LabelledDropDownInput("Type", (e) -> {});
    controls.getChildren().add(siteTypeInput);
    this.getChildren().add(controls);

    TestingSitesTable testingSitesTable = new TestingSitesTable();
    this.getChildren().add(testingSitesTable);

    try {
      ArrayList<DemoAPI.TestingSiteResponseBody> testingSites = DemoAPI.getTestingSites().join();
      for (var testingSite : testingSites) {
        String type = (String) testingSite.additionalInfo.get("type");
        String isOnsiteOnly = String.valueOf(testingSite.additionalInfo.get("isOnsiteOnly"));
        String isOpen = String.valueOf(testingSite.additionalInfo.get("isOpen"));
        String waitingTime = (String) testingSite.additionalInfo.get("waitingTime");
        testingSitesTable.addTestingSite(
            testingSite.name,
            type != null ? type : "N/A",
            isOnsiteOnly != null ? isOnsiteOnly : "N/A",
            isOpen != null ? isOpen : "N/A",
            waitingTime != null ? waitingTime : "N/A");
      }
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}

// ArcGISRuntimeEnvironment.setApiKey(Dotenv.load().get("ARC_GIS_KEY"));
// MapView mv = new MapView();
// mv.setPrefHeight(600);
// ArcGISMap map = new ArcGISMap(BasemapStyle.ARCGIS_COMMUNITY);
// mv.setMap(map);
// mv.setViewpoint(new Viewpoint(-37.8136, 147.9631, 14444000));
// this.getChildren().add(mv);
