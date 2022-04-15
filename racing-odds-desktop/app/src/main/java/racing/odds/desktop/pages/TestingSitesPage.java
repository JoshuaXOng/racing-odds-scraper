package racing.odds.desktop.pages;

import javafx.geometry.Pos;

import javafx.scene.layout.VBox;
import racing.odds.desktop.components.HorizontalNavbar;
import racing.odds.desktop.components.TestingSitesInfo;

public class TestingSitesPage extends VBox {
  public TestingSitesPage() {
    super(20);
    this.setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    this.getStyleClass().add("testing-sites-page");

    this.getChildren().add(new HorizontalNavbar());

    this.getChildren().add(new TestingSitesInfo());
  }
}
