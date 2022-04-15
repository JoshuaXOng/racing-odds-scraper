package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import racing.odds.desktop.DataStore;
import racing.odds.desktop.components.HorizontalNavbar;
import racing.odds.desktop.components.TestingSitesInfo;

public class TestingSitesPage extends Scene {
  public TestingSitesPage() {
    super(new VBox(20), 1280, 720);
    ((VBox) this.getRoot()).setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    ((VBox) this.getRoot()).getStyleClass().add("testing-sites-page");

    ((VBox) this.getRoot()).getChildren().add(new HorizontalNavbar());

    ((VBox) this.getRoot()).getChildren().add(new TestingSitesInfo());
  }
}
